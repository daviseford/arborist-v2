import * as React from 'react';
import { connect } from 'react-redux';
import Home from '../components/HomeNew';
import { IApplicationState } from '../reducers';
import { ICameraState } from '../reducers/camera_reducer';

export interface IHomeProps {
  camera: ICameraState;
  dispatch: Function;
}

const mapStateToProps = (state: IApplicationState): Partial<IHomeProps> => {
  return {
    camera: state.camera,
  };
};

export default (connect(mapStateToProps)(Home) as any as React.StatelessComponent<IHomeProps>);
