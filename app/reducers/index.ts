import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import { ICopyList } from '../definitions/copylist';
import copy_list from './copy_list';
import counter, { TState as TCounterState } from './counter';

const rootReducer = combineReducers({
  copy_list,
  counter,
  routing: routing as Reducer<any>,
});

export interface IState {
  copy_list: ICopyList[];
  counter: TCounterState;
}

export default rootReducer;
