import * as React from 'react';
import { connect } from 'react-redux';
import CopyList from '../components/copylist/CopyList';
import { IApplicationState } from '../reducers';

export interface ICopyListPageProps {
  camera: IApplicationState['camera'];
  copy_list: IApplicationState['copy_list'];
  destination: IApplicationState['destination'];
  directories: IApplicationState['directories'];
  dispatch: Function;
}

const mapStateToProps = (state: IApplicationState): Partial<ICopyListPageProps> => {
  return {
    camera: state.camera,
    copy_list: state.copy_list,
    destination: state.destination,
    directories: state.directories,
  };
};

export default (connect(mapStateToProps)(CopyList) as any as React.StatelessComponent<ICopyListPageProps>);
