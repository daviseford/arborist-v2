import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { ICopyList } from '../definitions/copylist';
import { ICameraState, IDestinationState, IDirState } from '../definitions/state';
import camera from './camera_reducer';
import copy_list from './copy_list_reducer';
import destination from './destination_reducer';
import directories from './directory_reducer';

const rootReducer = combineReducers({
  camera,
  copy_list,
  destination,
  directories,
  routing: routing as Reducer<any>,
});

export interface IApplicationState {
  camera: ICameraState;
  copy_list: ICopyList[];
  destination: IDestinationState;
  directories: IDirState[];
}

export default rootReducer;
