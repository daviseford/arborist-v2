import * as async from 'async';
import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as path from 'path';
import { convertFilenameToXML, parseXMLObj } from '../api/Sony_XML';
import { ICopyList } from '../definitions/copylist';
import { createDir, getDirectories_sync, getMP4Files } from './FileUtil';
import Types from './Types';

export default class XMLSorter {
  private copy_list: ICopyList[];
  private enable_copy: boolean;
  private scene_index: number;
  private subdirs: string[];
  private subscription: (error_type: any, error: any) => any;
  private t_dir: string;
  private working_filepath: string;

  constructor(working_filepath, subscription_cb, enable_copy = false) {
    this.enable_copy = enable_copy;
    this.subscription = subscription_cb;
    this.copy_list = [];
    this.working_filepath = working_filepath;
    this.scene_index = 1;
    this.subdirs = getDirectories_sync(this.working_filepath);
    this.t_dir = this.subdirs[0];

    this.addToCopyList = this.addToCopyList.bind(this);
    this.compareXMLObjs = this.compareXMLObjs.bind(this);
    this.copyMP4File = this.copyMP4File.bind(this);
    this.copyMP4Files = this.copyMP4Files.bind(this);
    this.copyXMLFile = this.copyXMLFile.bind(this);
    this.getSceneCopyFilepath = this.getSceneCopyFilepath.bind(this);
    this.copyXMLFiles = this.copyXMLFiles.bind(this);
    this.getXMLObjs = this.getXMLObjs.bind(this);
    this.processXMLDir = this.processXMLDir.bind(this);
  }

  // All of the magic happens in process()
  public process() {
    createDir(this.working_filepath, 'Scenes');

    async.waterfall(
      [this.getXMLObjs, this.parseAllXML],
      (err1, result) => {
        if (err1) { return this.subscription(Types.error, err1); }
        // Now we're cooking - let's start comparing values
        // This will add matches to the copy list
        this.processUpdatedXMLArray(result);

        // Just return the proposed copy list and exit this process
        // If we haven't enabled the copy feature
        if (!this.enable_copy) {
          this.subscription(Types.analysis, this.copy_list);
          return;
        }

        // Now we've got a copy list - time to start doing things
        if (this.copy_list.length > 0) {
          this.createSceneDirsByIndex();

          this.subscription(Types.copy_files_start, this.copy_list);

          // Copy the associated XML files first, then start on the big stuff
          async.series([
            this.copyXMLFiles,
            this.copyMP4Files,
          ],
            (err2, results) => {
              if (err2) { return this.subscription(Types.error, err2); }
              this.subscription(Types.copy_files_done, this.copy_list);
            });

        } else {
          this.subscription(Types.error, 'No matches were found using the XML sorter.');
        }
      },
    );

  }

  public copyXMLFiles(callback) {
    const that = this;
    this.subscription(Types.xml_copy_start, true);
    async.eachLimit(this.copy_list.filter(x => x.xml_filepath && x.dest_xml), 10,
      this.copyXMLFile,
      (err) => {
        if (err) {
          that.subscription(Types.error, err);
          callback(err);
        } else {
          that.subscription(Types.xml_copy_done, true);
          callback();
        }
      });
  }

  public copyXMLFile(obj, cb) {
    fs.copy(obj.xml_filepath, obj.dest_xml, (err) => {
      if (err) { return cb(err); }
      const i = this.copy_list.findIndex((x) => x.xml_filepath === obj.xml_filepath && x.dest_xml === obj.dest_xml);
      this.copy_list[i].done_xml = true;
      cb();
    });
  }

  public copyMP4Files(callback) {
    const that = this;
    async.eachLimit(this.copy_list, 5, this.copyMP4File,
      (err) => {
        if (err) {
          that.subscription(Types.error, err);
          callback(err);
        } else {
          callback(null, that.copy_list);
        }
      });
  }

  public copyMP4File(obj, cb) {
    const that = this;
    this.updateCopyListFileStatus(obj.filepath, obj.dest, true, false, true, false);

    fs.copy(obj.filepath, obj.dest, (err) => {
      if (err) { return cb(err); }
      that.subscription(Types.copy_file_done, obj);
      that.updateCopyListFileStatus(obj.filepath, obj.dest, false, true, false, true);
      cb();
    });
  }

  public createSceneDirsByIndex() {
    for (let i = 1; i <= this.scene_index; i++) {
      createDir(path.join(this.working_filepath, 'Scenes'), `Scene_${i}`);
    }
    this.subscription(Types.general, `Created ${this.scene_index} Scene folders`);
  }

  public processUpdatedXMLArray(updated_xml_array) {
    // The assumption here is that the target_directory is the source of truth for the # of Scenes
    // to be created. This may need to change in the future to allow user-targeting
    // of a specific target directory
    const target_dir_xml_array = updated_xml_array.filter(x => x.dir === this.t_dir);
    const other_dirs_xml_array = updated_xml_array.filter(x => x.dir !== this.t_dir);

    target_dir_xml_array.forEach((obj1, index) => {
      this.scene_index = index + 1;
      other_dirs_xml_array.forEach(obj2 => this.compareXMLObjs(obj1, obj2));
    });
  }

  public compareXMLObjs(obj1, obj2) {
    if (obj1.dir === obj2.dir) { return; }

    // Always add the target directory's file to a Scene
    this.addToCopyList(obj1);
    if (this.hasOverlap(obj1, obj2)) {
      this.addToCopyList(obj2);
    }

  }

  public hasOverlap(obj1, obj2) {
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

  }

  public getSceneCopyFilepath(filepath) {
    const filename = path.basename(filepath);
    const dirname = filepath.split(path.sep)[filepath.split(path.sep).length - 2];
    return path.join(this.working_filepath, 'Scenes', `Scene_${this.scene_index}`, `${dirname}_${filename}`);
  }

  public parseAllXML(xml_array, callback) {
    async.map(xml_array, parseXMLObj, (err, results) => {
      if (err) { return callback(err); }
      callback(null, results);
    });
  }

  public getXMLObjs(callback) {
    async.map(this.subdirs,
      this.processXMLDir,
      (err, results: ICopyList[][]) => {
        const result = results.reduce((a, b) => {
          // Flattens the results array
          return a.concat(b);
        }, []).filter(x => x.xml_filepath);
        // And then we filter out objects without an xml_filepath
        callback(null, result);
      },
    );
  }

  public processXMLDir(dir: string, pCallback) {
    const dir_filepath = path.join(this.working_filepath, dir);
    getMP4Files(dir_filepath, (err, files) => {
      async.map(files, (filename: string, mCallback) => {
        const obj: {[key: string]: string} = {
          dir,
          filename,
          filepath: path.join(dir_filepath, filename),
        };
        const xml_filepath = this.getAssociatedSonyXMLSync(filename, dir);
        if (!!xml_filepath) {
          obj.xml_filename = convertFilenameToXML(filename);
          obj.filepath = path.join(this.working_filepath, dir, filename);
          obj.xml_filepath = xml_filepath;
        }
        // Individual file done - return the map callback
        mCallback(undefined, obj);
      }, (err2, result) => {
        // All files taken care of, return the main callback
        pCallback(undefined, result);
      });
    });
  }

  public getAssociatedSonyXMLSync(filename, dir) {
    const name = convertFilenameToXML(filename);
    const xml_filepath = path.join(this.working_filepath, dir, name);
    if (fs.existsSync(xml_filepath)) {
      return xml_filepath;
    } else {
      return false;
    }
  }

  public updateCopyListFileStatus(src, dest, copying = false, done = false, start = false, end = false) {
    // Find the index of the matching copy_list entry (entries have unique filepath + dest combinations)
    const i = this.copy_list.findIndex((x) => x.filepath === src && x.dest === dest);
    // And update the status accordingly
    this.copy_list[i].copying = copying;
    this.copy_list[i].done = done;

    if (start) {
      this.copy_list[i].start_time = moment();
    }
    if (end) {
      this.copy_list[i].end_time = moment();
    }

    this.subscription(Types.copy_list_update, this.copy_list);
  }

  public addToCopyList(obj) {
    // Don't push duplicates
    // tslint:disable-next-line:max-line-length
    if (!this.copy_list.some((x) => x.filepath === obj.filepath && x.dest === this.getSceneCopyFilepath(obj.filepath))) {
      const copy_list_stats = {
        copying: false,
        dest: this.getSceneCopyFilepath(obj.filepath),
        dest_xml: this.getSceneCopyFilepath(obj.xml_filepath),
        done: false,
        done_xml: false,
      };
      const entry = Object.assign({}, obj, copy_list_stats);
      this.copy_list.push(entry);
    }
  }

}
