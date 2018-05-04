import * as React from 'react';
import { connect } from 'react-redux';
import ArboristMain from '../components/ArboristMain';
import { ICopyList } from '../definitions/copylist';
import { ICameraState } from '../definitions/state';
import { IApplicationState } from '../reducers/index';

export interface IArboristMainProps {
  copy_list: ICopyList[];
  camera: ICameraState;
  dispatch: Function;
}

const mapStateToProps = (state: IApplicationState): Partial<IArboristMainProps> => {
  return {
    camera: state.camera,
    copy_list: state.copy_list,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch<IState>): Partial<IArboristMainProps> => {
//   return bindActionCreators(CopyListActions as any, dispatch);
// };

// tslint:disable-next-line:max-line-length
export default (connect(mapStateToProps)(ArboristMain) as any as React.StatelessComponent<IArboristMainProps>);
