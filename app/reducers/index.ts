import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { ICopyList } from '../definitions/copylist';
import { ICameraState, IDirState } from '../definitions/state';
import camera from './camera_reducer';
import copy_list from './copy_list_reducer';
import directories from './directory_reducer';

const rootReducer = combineReducers({
  camera,
  copy_list,
  directories,
  routing: routing as Reducer<any>,
});

export interface IApplicationState {
  camera: ICameraState;
  copy_list: ICopyList[];
  directories: IDirState[];
}

export default rootReducer;
