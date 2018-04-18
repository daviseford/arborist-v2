import { decrement, increment } from '../actions/counter';
import { IAction } from '../actions/helpers';

export type TState = number;

export default (state: number = 0, action: IAction) => {
  if (increment.test(action)) {
    return state + 1;
  } else if (decrement.test(action)) {
    return state - 1;
  }

  return state;
};
