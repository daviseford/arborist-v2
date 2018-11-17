import { Moment } from 'moment';
import { TPrimaryDirectory, TSecondaryDirectory } from './directory';

export interface ICopyList {
  index: number;
  copying: boolean;
  created_date?: string;
  dest_xml: string;
  dest: string;
  device_manufacturer: string;
  dir: string;
  duration_mins: number;
  done_xml: boolean;
  done: boolean;
  end_time?: Moment;
  filepath: string;
  filename: string;
  filesize_gb: number;
  fps: number;
  model_name: string;
  scene_index: number;
  start_time?: Moment;
  type?: TPrimaryDirectory | TSecondaryDirectory;
  xml_filename: string;
  xml_filepath: string;
}

export interface ICopyListUpdate {
  index?: number;
  copying?: boolean;
  created_date?: string;
  dest_xml?: string;
  dest?: string;
  device_manufacturer?: string;
  dir?: string;
  duration_mins?: number;
  done_xml?: boolean;
  done?: boolean;
  end_time?: Moment;
  filepath: string;
  filename?: string;
  filesize_gb?: number;
  fps?: number;
  model_name?: string;
  scene_index?: number;
  start_time?: Moment;
  type?: TPrimaryDirectory | TSecondaryDirectory;
  xml_filename?: string;
  xml_filepath?: string;
}
