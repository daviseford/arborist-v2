import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { ICopyList } from '../definitions/copylist';
import camera from './camera_reducer';
import copy_list from './copy_list_reducer';
import directory, { IDirState } from './directory_reducer';
import manufacturer from './manufacturer_reducer';

const rootReducer = combineReducers({
  camera,
  copy_list,
  directory,
  manufacturer,
  routing: routing as Reducer<any>,
});

export interface IApplicationState {
  camera: { camera: string | null };
  copy_list: ICopyList[];
  directory: IDirState[];
  manufacturer: { manufacturer: string | null };
}

export default rootReducer;
