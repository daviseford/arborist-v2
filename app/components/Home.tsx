// tslint:disable:max-line-length
import * as React from 'react';
import { addCameraNumber } from '../actions/camera_actions';
import { IHomeProps } from '../containers/HomePage';
import { ICameraState } from '../reducers/camera_reducer';
import { kAppName, kDefaultCameraNumber, kMaxCameraNumber, kVersion } from '../utils/config';

export default class Home extends React.Component<IHomeProps, {}> {
  constructor(props) {
    super(props);
    this.handleCameraUpdate = this.handleCameraUpdate.bind(this);
  }

  public handleCameraUpdate(number: number) {
    this.props.dispatch(addCameraNumber(number));
  }
  public render() {
    console.log(this.props);
    return (
      <div className="container">

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h4 className="animated slideInLeft">
              Hey, welcome to <span className="text-success">{kAppName} v{kVersion}</span>
            </h4>
            <p>To get started, let's find out what you're working with. </p>
          </div>

          <div className="col-6 offset-3 align-self-center">
            <NumCameraInput
              handleCameraUpdate={this.handleCameraUpdate}
              number={this.props.camera.number}
            />
          </div>

        </div>
      </div>
    );
  }
}

interface INumCameraInputProps {
  handleCameraUpdate: (number: number | null) => void;
  number: ICameraState['number'];
}
class NumCameraInput extends React.Component<INumCameraInputProps, {}> {
  constructor(pProps) {
    super(pProps);
    this.handleChange = this.handleChange.bind(this);
  }
  public handleChange(e) {
    let val = e.target.value ? parseInt(e.target.value, 10) : null;
    if (val && val > kMaxCameraNumber) {
      val = kMaxCameraNumber;
    }
    this.props.handleCameraUpdate(val);
  }
  public render() {
    return (
      <div className="form-group row">
        <label htmlFor="cameras" className="col-6 col-form-label small text-right">
          # of Cameras
          </label>
        <div className="col-4">
          <div className="input-group">

            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-camera-retro"></i>
              </span>
            </div>

            <input
              id="cameras"
              name="cameras"
              placeholder={`${kDefaultCameraNumber}`}
              type="number"
              className="form-control here"
              required
              onChange={this.handleChange}
              value={this.props.number || ''}
            />
          </div>
        </div>
      </div>
    );
  }
}
