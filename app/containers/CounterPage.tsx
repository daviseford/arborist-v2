import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions/counter';
import { Counter, IProps } from '../components/Counter';
import { IState } from '../reducers';

const mapStateToProps = (state: IState): Partial<IProps> => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IState>): Partial<IProps> => {
  return bindActionCreators(CounterActions as any, dispatch);
};

export default (connect(mapStateToProps, mapDispatchToProps)(Counter) as any as React.StatelessComponent<IProps>);
