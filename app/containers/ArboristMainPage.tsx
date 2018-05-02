import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as CopyListActions from '../actions/copy_list';
import ArboristMain from '../components/ArboristMain';
import { ICopyList } from '../definitions/copylist';
import { IState } from '../reducers';

export interface IArboristMainProps {
  addCopyList: (obj: ICopyList) => void;
  updateCopyList: (obj: ICopyList[]) => void;
  clearCopyList: () => void;
  copy_list: ICopyList[];
  counter: number;
}

const mapStateToProps = (state: IState): Partial<IArboristMainProps> => {
  return {
    copy_list: state.copy_list,
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IState>): Partial<IArboristMainProps> => {
  return bindActionCreators(CopyListActions as any, dispatch);
};

// tslint:disable-next-line:max-line-length
export default (connect(mapStateToProps, mapDispatchToProps)(ArboristMain) as any as React.StatelessComponent<IArboristMainProps>);
