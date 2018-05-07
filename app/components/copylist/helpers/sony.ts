import * as fs from 'fs';
import * as path from 'path';
import * as XMLParser from 'pixl-xml';
import { getFilesizeInGigabytes_Sync } from '../../../api/FileUtil';
import { convertFileNametoXML_Sony } from '../../../api/Sony_XML';
import { IBasicSorterEntry, IParsedSonyXMLObject, ISonyXMLObj, ISorterEntry } from '../../../definitions/sony_xml';
import { IDirState } from '../../../definitions/state';
import { isMP4 } from './../../../api/FileUtil';
import { IFileInfo } from './../../../definitions/state';

// todo remove xml2js dependcenyd

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
        if (isMP4(obj.filename)) {
            a.push(obj);
        }
        return a;
    }, []);
};

export const parseBasicSorterEntries = (xml_array: IBasicSorterEntry[]): ISorterEntry[] => {
    return xml_array.map(parseXMLObjNew);
};

export const parseXMLObjNew = (x: IBasicSorterEntry): ISorterEntry => {
    try {
        const f = fs.readFileSync(x.xml_filepath, 'utf8');
        console.log('f', f);
        const jsonObj = XMLParser.parse(f);
        console.log('j', jsonObj);
        const a = {
            ...x,
            ...parseXMLObject_Sony(jsonObj),
            ...getFilesizeInGigabytes_Sync(x.filepath),
        };
        console.log('a', a);
        return a;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const parseXMLObject_Sony = (xml_object: ISonyXMLObj): IParsedSonyXMLObject => {
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
  
