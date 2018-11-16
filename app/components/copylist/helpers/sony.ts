import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as path from 'path';
import * as XMLParser from 'pixl-xml';
import * as util from 'util';
import { batchUpdateCopyList, updateCopyList } from '../../../actions/copy_list_actions';
import { getFilesizeInGigabytes_Async, getSceneCopyFilepath, isMP4 } from '../../../api/FileUtil';
import { IBasicSorterEntry, IParsedSonyXMLObject, ISonyXMLObj, ISorterEntry } from '../../../definitions/sony_xml';
import { IDestinationState, IDirState, IFileInfo } from '../../../definitions/state';
import { ICopyList } from './../../../definitions/copylist';
import { kDirectoryPrimary } from './../../../utils/config';

const pLimit = require('p-limit');
const readFile = util.promisify(fs.readFile);
interface IGetAssociatedSonyXML { xml_filepath: string; xml_filename: string; }

export const getAssociatedXML_Sony = async (filename: string, dir: string): Promise<IGetAssociatedSonyXML> => {
    const xml_filename = convertFileNametoXML_Sony(filename);
    const xml_filepath = path.join(dir, xml_filename);
    const xml_exists = await fs.pathExists(xml_filepath);
    return xml_exists ? { xml_filepath, xml_filename } : { xml_filename: '', xml_filepath: '' };
};

export const getBasicSorterEntries_Sony = async (dir: IDirState): Promise<IBasicSorterEntry[]> => {
    const res = await Promise.all(dir.files.map(async (file: IFileInfo): Promise<IBasicSorterEntry> => {
        const xml = await getAssociatedXML_Sony(file.filename, dir.path);
        return {
            ...file,
            dir: dir.path,
            type: dir.type,
            ...xml,
        };
    }));

    return res.filter(x => isMP4(x.filename) && x.xml_filepath);
};

export const convertFileNametoXML_Sony = (filename: string): string => {
    let file = filename;
    if (file.toUpperCase().includes('.MP4')) {
        file = file.split('.')[0];
    }
    return `${file}M01.XML`;
};

export const getAssociatedXMLFile_Sony_Sync = (mp4_filename: string, files: IFileInfo[]): IFileInfo | null => {
    const match = files.find(x => convertFileNametoXML_Sony(mp4_filename) === x.filename);
    return match ? match : null;
};

export const parseBasicSorterEntries_Sony = async (xml_array: IBasicSorterEntry[]): Promise<ISorterEntry[]> => {
    const res = await Promise.all(xml_array.map(getXMLFileDetails_Sony));
    return res;
};

export const getXMLFileDetails_Sony = async (entry: IBasicSorterEntry): Promise<ISorterEntry> => {
    try {
        const f = await readFile(entry.xml_filepath);
        const jsonObj = XMLParser.parse(f);
        const filesize = await getFilesizeInGigabytes_Async(entry.filepath);
        const parsedXMLObj = {
            ...entry,
            ...parseXmlJson_Sony(jsonObj),
            ...filesize,
        };
        return parsedXMLObj;
    } catch (e) {
        throw e;
    }
};

const parseXmlJson_Sony = (xml_object: ISonyXMLObj): IParsedSonyXMLObject => {
    const duration = parseInt(xml_object.Duration.value, 10);
    const fps = parseInt(xml_object.LtcChangeTable.tcFps, 10);
    let created_date = xml_object.CreationDate.value;
    created_date = created_date.split('').slice(0, created_date.length - 6).join('');  // Remove the timezone
    const device_manufacturer = xml_object.Device.manufacturer;
    const model_name = xml_object.Device.modelName;
    const duration_mins = parseFloat((duration / fps / 60).toFixed(2));
    return {
        created_date,
        device_manufacturer,
        duration_mins,
        fps,
        model_name,
    };
};

// tslint:disable-next-line:max-line-length
export const addSorterEntriesToCopyList = (entries: ISorterEntry[], dirs: IDirState[], dest: IDestinationState): ICopyList[] => {
    if (dirs.filter(x => x.type === kDirectoryPrimary).length === 0) { return []; }
    const t_dir = dirs.filter(x => x.type === kDirectoryPrimary)[0].path;
    const target_dir_xml_array = entries.filter(x => x.dir === t_dir);
    const other_dirs_xml_array = entries.filter(x => x.dir !== t_dir);
    const copy_list_res = _.flatten(target_dir_xml_array.map((obj1, index) => {
        const scene_index = index + 1;
        return _.flatten(other_dirs_xml_array.map(obj2 => {
            return addItemsToCopyList(obj1, obj2, scene_index, dest);
        }));
    }));
    return _.uniqBy(copy_list_res, x => x.dest);
};

// tslint:disable-next-line:max-line-length
export const addItemsToCopyList = (obj1: ISorterEntry, obj2: ISorterEntry, scene_index: number, dest: IDestinationState): ICopyList[] => {
    if (obj1.dir === obj2.dir) { return []; }
    const res: ICopyList[] = [];
    const copy1 = getCopyList(obj1, scene_index, dest);
    res.push(copy1);    // Always add the target directory's file to a Scene
    if (hasOverlap(obj1, obj2)) {
        const copy2 = getCopyList(obj2, scene_index, dest);
        res.push(copy2);
    }
    return res;
};

// tslint:disable-next-line:max-line-length
const getCopyList = (obj: ISorterEntry, scene_index: number, dest: IDestinationState): ICopyList => {
    const copy_list_stats = {
        copying: false,
        dest: getSceneCopyFilepath(obj.filepath, scene_index, dest),
        dest_xml: getSceneCopyFilepath(obj.xml_filepath, scene_index, dest),
        done: false,
        done_xml: false,
        index: scene_index - 1,
        scene_index,
    };
    const entry = { ...obj, ...copy_list_stats };
    return entry;
};

const hasOverlap = (obj1, obj2) => {
    const format = 'YYYY-MM-DDTHH:mm:ss';

    const start1 = moment(obj1.created_date, format);
    const start2 = moment(obj2.created_date, format);
    const end1 = moment(obj1.created_date, format).add(obj1.duration_mins, 'm');
    const end2 = moment(obj2.created_date, format).add(obj2.duration_mins, 'm');

    if (start2.isBetween(start1, end1) || end2.isBetween(start1, end1)) {
        return true;
    }
    if (start1.isBetween(start2, end2) || end1.isBetween(start2, end2)) {
        return true;
    }
    return false;

};

export const copySingleCopyListEntry = async (copy_list: ICopyList, dispatch: Function): Promise<void> => {
    const filepath = copy_list.filepath;
    try {
        dispatch(updateCopyList({ filepath, copying: true, start_time: moment() }));

        // copy XML file (small)
        await fs.copy(copy_list.xml_filepath, copy_list.dest_xml);
        dispatch(updateCopyList({ filepath, done_xml: true }));

        // then copy the MP4
        await fs.copy(copy_list.filepath, copy_list.dest);
        dispatch(updateCopyList({ filepath, done: true, copying: false, end_time: moment() }));

    } catch (e) {
        // todo dispatch error
        console.error(e);
    }
};

// tslint:disable-next-line:max-line-length
export const runCopyFile_Sony = async (copy_list: ICopyList[], dest: IDestinationState, dispatch: Function): Promise<void> => {
    try {
        const limit = pLimit(4);
        const requests = copy_list.map(x => {
            return limit(async () => {
                await copySingleCopyListEntry(x, dispatch);
            });
        });
        await Promise.all(requests);
        console.log('All done!');   // TODO: dispatch overall done
    } catch (e) {
        // TODO: dispatch done w/ errors
        console.log(e);
        throw e;
    }
};

// tslint:disable-next-line:max-line-length
export const initializeCopyList_Sony = async (dirs: IDirState[], dest: IDestinationState, dispatch: Function): Promise<any> => {
    const arr_of_basic_entries = await Promise.all(dirs.map(async (dir) => {
        const entries = await getBasicSorterEntries_Sony(dir);
        return entries;
    }));

    const basicSorterEntries = _.flatten(arr_of_basic_entries) as IBasicSorterEntry[];
    const sorterEntries = await parseBasicSorterEntries_Sony(basicSorterEntries);
    // At this point, we've got the XML objects for the copy list
    const copy_list = addSorterEntriesToCopyList(sorterEntries, dirs, dest);
    dispatch(batchUpdateCopyList(copy_list));
};
