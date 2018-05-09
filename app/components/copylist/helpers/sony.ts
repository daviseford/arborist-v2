import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as path from 'path';
import * as XMLParser from 'pixl-xml';
import * as rimraf from 'rimraf';
import { updateCopyList } from '../../../actions/copy_list_actions';
import { createDir, getFilesizeInGigabytes_Sync } from '../../../api/FileUtil';
import { IBasicSorterEntry, IParsedSonyXMLObject, ISonyXMLObj, ISorterEntry } from '../../../definitions/sony_xml';
import { IDestinationState, IDirState, IFileInfo } from '../../../definitions/state';
import { isMP4 } from './../../../api/FileUtil';
import { ICopyList } from './../../../definitions/copylist';
import { kDirectoryPrimary, kOutputDirectory } from './../../../utils/config';

// todo remove xml2js dependency

interface IGetAssociatedSonyXMLSync { xml_filepath: string; xml_filename: string; }

export const getAssociatedSonyXMLSync = (filename: string, dir: string): IGetAssociatedSonyXMLSync => {
    const xml_filename = convertFileNametoXML_Sony(filename);
    const xml_filepath = path.join(dir, xml_filename);
    if (fs.existsSync(xml_filepath)) {
        return { xml_filepath, xml_filename };
    }
    return { xml_filename: '', xml_filepath: '' };
};

export const getBasicSorterEntries_Sony = (dir: IDirState): IBasicSorterEntry[] => {
    return dir.files.reduce((a: IBasicSorterEntry[], file: IFileInfo) => {
        const obj = {
            ...file,
            dir: dir.path,
            type: dir.type,
            ...getAssociatedSonyXMLSync(file.filename, dir.path),
        };
        // removing any files without xml_filepaths here
        if (isMP4(obj.filename) && obj.xml_filepath) {
            a.push(obj);
        }
        return a;
    }, []);
};

export const convertFileNametoXML_Sony = (filename: string): string => {
    let file = filename;
    if (file.toUpperCase().includes('.MP4')) {
        file = file.split('.')[0];
    }
    return `${file}M01.XML`;
};

export const getAssociatedXMLFile = (mp4_filename: string, files: IFileInfo[]): IFileInfo | null => {
    const match = files.find(x => convertFileNametoXML_Sony(mp4_filename) === x.filename);
    return match ? match : null;
};

export const parseBasicSorterEntries = (xml_array: IBasicSorterEntry[]): ISorterEntry[] => {
    return xml_array.map(getXMLFileDetails);
};

export const getXMLFileDetails = (entry: IBasicSorterEntry): ISorterEntry => {
    try {
        const f = fs.readFileSync(entry.xml_filepath, 'utf8');
        const jsonObj = XMLParser.parse(f);
        const parsedXMLObj = {
            ...entry,
            ...parseXmlJson_Sony(jsonObj),
            ...getFilesizeInGigabytes_Sync(entry.filepath),
        };
        console.log('parseXMLObjNew', parsedXMLObj);
        return parsedXMLObj;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const parseXmlJson_Sony = (xml_object: ISonyXMLObj): IParsedSonyXMLObject => {
    // console.log('parsing xml_object', xml_object);
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

// add this to component next
// tslint:disable-next-line:max-line-length
export const processUpdatedXMLArray = (entries: ISorterEntry[], dirs: IDirState[], dest: IDestinationState): ICopyList[] => {
    // The assumption here is that the target_directory is the source of truth for the # of Scenes
    // to be created. This may need to change in the future to allow user-targeting
    // of a specific target directory
    const t_dir = dirs.filter(x => x.type === kDirectoryPrimary)[0].path;
    const target_dir_xml_array = entries.filter(x => x.dir === t_dir);
    const other_dirs_xml_array = entries.filter(x => x.dir !== t_dir);
    const copy_list: ICopyList[] = [];
    target_dir_xml_array.forEach((obj1, index) => {
        const scene_index = index + 1;
        other_dirs_xml_array.forEach(obj2 => {
            copy_list.push(...compareXMLObjs(obj1, obj2, scene_index, dest, copy_list));
        });
    });
    return copy_list;
};

// tslint:disable-next-line:max-line-length
export const compareXMLObjs = (obj1: ISorterEntry, obj2: ISorterEntry, scene_index: number, dest: IDestinationState, copy_list: ICopyList[]): ICopyList[] => {
    if (obj1.dir === obj2.dir) { return []; }
    const res: ICopyList[] = [];
    const copy1 = getCopyList(obj1, scene_index, dest, copy_list);
    // Always add the target directory's file to a Scene
    if (copy1) { res.push(copy1); }
    if (hasOverlap(obj1, obj2)) {
        const copy2 = getCopyList(obj2, scene_index, dest, copy_list);
        if (copy2) { res.push(copy2); }
    }
    return res;
};

// tslint:disable-next-line:max-line-length
const getCopyList = (obj: ISorterEntry, scene_index: number, dest: IDestinationState, copy_list: ICopyList[]): ICopyList | null => {
    console.log('asdasd', obj);
    // Don't push duplicates
    // tslint:disable-next-line:max-line-length
    if (!copy_list.some((x) => x.filepath === obj.filepath && x.dest === getSceneCopyFilepath(obj.filepath, scene_index, dest))) {
        const copy_list_stats = {
            copying: false,
            dest: getSceneCopyFilepath(obj.filepath, scene_index, dest),
            dest_xml: getSceneCopyFilepath(obj.xml_filepath, scene_index, dest),
            done: false,
            done_xml: false,
            scene_index,
        };
        const entry = { ...obj, ...copy_list_stats };
        return entry;
    }
    return null;
};

const getSceneCopyFilepath = (filepath: string, scene_index: number, dest: IDestinationState): string => {
    const filename = path.basename(filepath);
    const dirname = filepath.split(path.sep)[filepath.split(path.sep).length - 2];
    return path.join(dest.path, kOutputDirectory, getSceneDirName(scene_index), `${dirname}_${filename}`);
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

// const getDirName = (filepath: string): string => {
//     const p = filepath.split(path.sep);
//     return p[p.length - 2];
// };

export const removeSceneDirectory = (dest: IDestinationState): void => {
    rimraf.sync(path.join(dest.path, kOutputDirectory));
    console.log('deleted old dirs');
};

export const getSceneDirName = (scene_index: number): string => {
    return `Scene_${scene_index}`;
};

export const createDestinationDirs = (copy_list: ICopyList[], dest: IDestinationState): void => {
    createDir(dest.path, kOutputDirectory);
    const destDir = path.join(dest.path, kOutputDirectory);
    const scene_count = copy_list[copy_list.length - 1].scene_index || 1;
    for (let i = 1; i < scene_count + 1; i++) {
        createDir(destDir, getSceneDirName(i));
    }
    console.log(`Created ${scene_count} directories.`);
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

        console.log('done');
    } catch (e) {
        // todo dispatch error
        console.error(e);
        throw e;
    }
};

// tslint:disable-next-line:max-line-length
export const runCopyFile = async (copy_list: ICopyList[], dest: IDestinationState, dispatch: Function): Promise<void> => {
    try {
        await queue(copy_list, 4, dispatch);
        console.log('all done!');
        // todo dispatch overall done
    } catch (e) {
        // todo dispatch done w/ errors
        console.log(e);
        throw e;
    }
};

const queue = async (copy_list: ICopyList[], max_concurrent: number = 3, dispatch: Function): Promise<void> => {
    try {
        const amount = copy_list.length > max_concurrent ? max_concurrent : copy_list.length;
        const queued = copy_list.slice(0, amount);

        if (queued.length > 0) {
            await run(queued, dispatch); // Run concurrently
            const next = copy_list.slice(amount, copy_list.length);
            return next.length > 0 ? queue(next, max_concurrent, dispatch) : undefined;
        }

    } catch (e) {
        console.error('Error in queue', e);
        throw e;
    }
};

const run = async (opts: ICopyList[], dispatch: Function): Promise<void> => {
    try {
        await Promise.all(opts.map(x => copySingleCopyListEntry(x, dispatch)));
    } catch (e) {
        console.error(e);
        throw e;
    }
};
