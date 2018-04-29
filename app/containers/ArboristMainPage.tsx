import * as React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import ArboristMain from '../components/ArboristMain';
import { ICopyList } from '../definitions/copylist';
import { IState } from '../reducers';

interface IProps {
  console_output: string;
  copy_list: ICopyList[];
  dirs: string[];
  filepath: string;
  isSorted: boolean;
  isSorting: boolean;
}

const mapStateToProps = (state: IState): Partial<IProps> => {
  return {
    // counter: state.counter,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch<IState>): Partial<IProps> => {
//   return bindActionCreators(CounterActions as any, dispatch);
// };

export default (connect(mapStateToProps)(ArboristMain) as any as React.StatelessComponent<IProps>);
