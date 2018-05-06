import * as async from 'async';
import * as fs from 'fs-extra';
import * as path from 'path';

export const getDirectories_sync = (filepath: string): string[] => {
  return fs.readdirSync(filepath).filter(dir => {
    return fs.statSync(path.join(filepath, dir)).isDirectory();
  });
};

export const getMixedFilesSync = (filepath: string): string[] => {
  return fs.readdirSync(filepath).filter(file => {
    const check1 = fs.statSync(path.join(filepath, file)).isFile();
    const check2 = (file.toUpperCase().endsWith('.MP4') || file.toUpperCase().endsWith('.XML'));
    return check1 && check2 && !hasBadChar(file);
  });
};

export const getMP4FilesSync = (filepath: string): string[] => {
  return fs.readdirSync(filepath).filter(file => {
    return fs.statSync(path.join(filepath, file)).isFile() && file.toUpperCase().includes('.MP4') && !hasBadChar(file);
  });
};

export const getMP4Files = (filepath: string, callback: any) => {
  fs.readdir(filepath, (err, pFiles) => {
    if (err) { return callback(err); }
    async.filter(pFiles,
      (file, cb) => {
        fs.stat(path.join(filepath, file), (err1: any, stats) => {
          if (err1) { return cb(err1); }
          const check = stats.isFile() && file.toUpperCase().includes('.MP4') && !hasBadChar(file);
          cb(null, check);
        });
      },
      (err2: any, files: any) => {
        if (err2) { return callback(err2); }
        callback(null, files);
      },
    );
  });
};

export const createDir = (dirpath: string, new_dir_name: string): void => {
  const dir = path.join(dirpath, new_dir_name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export const getFilesizeInGigabytes = (filepath: string, callback: (err: any, gb?: number) => number) => {
  fs.stat(filepath, (err, stats) => {
    if (err) { return callback(err); }
    return callback(null, bytes_to_gb(stats.size));
  });
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
