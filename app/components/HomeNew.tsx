// tslint:disable:max-line-length
import * as React from 'react';
import { addCamera } from '../actions/camera_actions';
import { IHomeProps } from '../containers/HomePageNew';
import { kAppName, kVersion } from '../utils/config';

export default class Home extends React.Component<IHomeProps, {}> {
  constructor(props) {
    super(props);
    this.handleCameraUpdate = this.handleCameraUpdate.bind(this);
  }

  public handleCameraUpdate(camera: string) {
    this.props.dispatch(addCamera(camera));
    console.log(this.props);
  }
  public render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '7%' }}>

          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2 text-center">
              <h4 className="animated slideInLeft">
                Hey, welcome to <span className="text-success">{kAppName} v{kVersion}</span>
              </h4>
              <p>To get started, let's find out what you're working with.
                </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 text-center">
              <NumCameraInput
                handleCameraUpdate={this.handleCameraUpdate}
                camera={this.props.camera.camera}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

interface INumCameraInputProps {
  handleCameraUpdate: (camera: string) => void;
  camera: string | null;
}
class NumCameraInput extends React.Component<INumCameraInputProps, {}> {
  constructor(pProps) {
    super(pProps);

  }
  public handleChange(e) {
    const val = e.target.value || null;
    this.props.handleCameraUpdate(val);
  }
  public render() {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-xs-8 col-sm-3">
            <label htmlFor="dirNumInput" className="small"> How many cameras? </label>
          </div>
          <div className="col-xs-4 col-sm-4">
            <input
              className="form-control"
              id="dirNumInput"
              onChange={this.handleChange}
              value={this.props.camera || ''}
            />
          </div>
        </div>
      </div>
    );
  }
}
