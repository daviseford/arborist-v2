import * as React from 'react';
import { connect } from 'react-redux';
import Directories from '../components/Directories';
import { IApplicationState } from '../reducers';

export interface IDirectoryProps {
  camera: IApplicationState['camera'];
  directories: IApplicationState['directories'];
  dispatch: Function;
}

const mapStateToProps = (state: IApplicationState): Partial<IDirectoryProps> => {
  return {
    camera: state.camera,
    directories: state.directories,
  };
};

export default (connect(mapStateToProps)(Directories) as any as React.StatelessComponent<IDirectoryProps>);
