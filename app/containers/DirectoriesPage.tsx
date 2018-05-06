import * as React from 'react';
import { connect } from 'react-redux';
import Directories from '../components/directories/Directories';
import { IApplicationState } from '../reducers';

export interface IDirectoriesProps {
  camera: IApplicationState['camera'];
  destination: IApplicationState['destination'];
  directories: IApplicationState['directories'];
  dispatch: Function;
}

const mapStateToProps = (state: IApplicationState): Partial<IDirectoriesProps> => {
  return {
    camera: state.camera,
    destination: state.destination,
    directories: state.directories,
  };
};

export default (connect(mapStateToProps)(Directories) as any as React.StatelessComponent<IDirectoriesProps>);
