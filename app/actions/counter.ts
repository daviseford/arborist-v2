import { actionCreatorVoid } from './helpers';

export const increment = actionCreatorVoid('INCREMENT_COUNTER');
export const decrement = actionCreatorVoid('DECREMENT_COUNTER');

export const incrementIfOdd = () => {
  return (dispatch: (action: any) => any, getState: () => any) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
};

export const incrementAsync = (delay: number = 1000) => {
  return (dispatch: (action: any) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
};
