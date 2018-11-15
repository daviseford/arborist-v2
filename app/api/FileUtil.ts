import * as fs from 'fs-extra';
import * as path from 'path';
import * as rimraf from 'rimraf';
import * as util from 'util';
import { ICopyList } from '../definitions/copylist';
import { IDestinationState } from '../definitions/state';
import { kOutputDirectory } from '../utils/config';

const stat = util.promisify(fs.stat);

export const getDirectories_sync = (filepath: string): string[] => {
  return fs.readdirSync(filepath).filter(dir => {
    return fs.statSync(path.join(filepath, dir)).isDirectory();
  });
};

export const getMixedFilesSync = (filepath: string): string[] => {
  return fs.readdirSync(filepath).filter(file => {
    const check1 = fs.statSync(path.join(filepath, file)).isFile();
    const check2 = (isMP4(file) || isXML(file));
    return check1 && check2 && !hasBadChar(file);
  });
};

export const createDir = (dirpath: string, new_dir_name: string): void => {
  const dir = path.join(dirpath, new_dir_name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export const getFilesizeInGigabytes_Async = async (filepath: string): Promise<{ filesize_gb: number }> => {
  const stats = await stat(filepath) as { size: number };
  return { filesize_gb: bytes_to_gb(stats.size) };
};

export const bytes_to_gb = (size_in_bytes: number): number => {
  const fileSizeInMegabytes = size_in_bytes / 1000000.0;
  const fileSizeInGigabytes = fileSizeInMegabytes / 1000;
  return fileSizeInGigabytes;
};

const hasBadChar = (name: string): boolean => ['.', '_', '~'].some(x => x === name.split('')[0]);

export const getDirNameFromFilepath = (filepath: string): string => {
  const p = filepath.split(path.sep);
  return p[p.length - 1];
};

export const getShortDirPath = (filepath: string): string => {
  const p = filepath.split(path.sep);
  return path.join(p[p.length - 2], p[p.length - 1]);
};

export const isMP4 = (filename: string): boolean => {
  return !!filename && filename.toUpperCase().endsWith('.MP4');
};

export const isXML = (filename: string): boolean => {
  return !!filename && filename.toUpperCase().endsWith('.XML');
};

export const getSceneDirName = (scene_index: number): string => `Scene_${scene_index}`;

export const removeSceneDirectory = (dest: IDestinationState): void => {
  try {
    rimraf.sync(path.join(dest.path, kOutputDirectory));
  } catch (err) {
    console.error(err);
  }
};

export const createDestinationDirs = (copy_list: ICopyList[], dest: IDestinationState): void => {
  createDir(dest.path, kOutputDirectory);
  const destDir = path.join(dest.path, kOutputDirectory);
  const scene_count = copy_list[copy_list.length - 1].scene_index || 1;
  for (let i = 1; i < scene_count + 1; i++) {
    createDir(destDir, getSceneDirName(i));
  }
  // console.log(`Created ${scene_count} directories.`);
};

export const getSceneCopyFilepath = (filepath: string, scene_index: number, dest: IDestinationState): string => {
  const filename = path.basename(filepath);
  const dirname = filepath.split(path.sep)[filepath.split(path.sep).length - 2];
  return path.join(dest.path, kOutputDirectory, getSceneDirName(scene_index), `${dirname}_${filename}`);
};
