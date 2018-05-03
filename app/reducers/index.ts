import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { ICopyList } from '../definitions/copylist';
import camera from './camera_reducer';
import copy_list from './copy_list_reducer';
import counter, { TState as TCounterState } from './counter_reducer';
import directory, { IDirState } from './directory_reducer';
import manufacturer from './manufacturer_reducer';

const rootReducer = combineReducers({
  camera,
  copy_list,
  counter,
  directory,
  manufacturer,
  routing: routing as Reducer<any>,
});

export interface IState {
  camera: { camera: string | null };
  copy_list: ICopyList[];
  counter: TCounterState;
  directory: IDirState[];
  manufacturer: { manufacturer: string | null };
}

export default rootReducer;
