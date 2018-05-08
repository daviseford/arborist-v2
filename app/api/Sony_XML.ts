import * as async from 'async';
import * as fs from 'fs-extra';
import * as xml2js from 'xml2js';
import { IBasicSorterEntry, IParsedSonyXMLObject, ISonyXMLObj, ISorterEntry } from '../definitions/sony_xml';
import { IFileInfo } from '../definitions/state';
import { getFilesizeInGigabytes } from './FileUtil';

/**
 * @param xml_obj
 * @param callback
 *
 * Takes in a basic XML Object and fleshes it out with stats, filesizes, etc
 *
 * @returns an xml_object with the following properties
 *
 * created_date
 * device_manufacturer
 * dir
 * duration_mins
 * filename
 * filepath
 * filesize_gb
 * fps
 * model_name
 * xml_filename
 * xml_filepath
 */
export const parseXMLObj = (xml_obj: IBasicSorterEntry, callback: (err: any, data?: any) => ISorterEntry | void) => {
  // Add any XML transformations here
  async.waterfall(
    [
      (cb: any) => {
        return fs.readFile(xml_obj.xml_filepath, (err, fileData) => {
          if (err) { return cb(err); }
          cb(null, fileData);
        });
      },

      (fileData: any, cb: any) => {
        const parser = new xml2js.Parser();
        return parser.parseString(fileData, (err: null, result: any) => {
          if (err) { return cb(err); }
          // Merge the parsed XML object and the existing one
          const merged_xml_obj = Object.assign({}, xml_obj, parseXMLObject(result));
          cb(null, merged_xml_obj);
        });
      },

      (merged_xml_obj: any, cb: any) => {
        getFilesizeInGigabytes(merged_xml_obj.filepath, (err: null, filesize_gb: number) => {
          if (err) { return cb(err); }
          const obj = Object.assign({}, merged_xml_obj, { filesize_gb });
          cb(null, obj);
        });
      },
    ], (err, new_xml_obj) => {
      // Return our results to the callback
      if (err) { return callback(err); }
      console.log('new', new_xml_obj);
      callback(null, new_xml_obj);
    },
  );
};

const parseXMLObject = (xml_object: ISonyXMLObj): IParsedSonyXMLObject => {
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
