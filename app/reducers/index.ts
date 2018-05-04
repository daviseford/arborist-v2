import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { ICopyList } from '../definitions/copylist';
import camera, { ICameraState } from './camera_reducer';
import copy_list from './copy_list_reducer';
import directory, { IDirState } from './directory_reducer';

const rootReducer = combineReducers({
  camera,
  copy_list,
  directory,
  routing: routing as Reducer<any>,
});

export interface IApplicationState {
  camera: ICameraState;
  copy_list: ICopyList[];
  directory: IDirState[];
}

export default rootReducer;
