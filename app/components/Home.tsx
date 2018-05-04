// tslint:disable:max-line-length
import * as React from 'react';
import { Link } from 'react-router-dom';
import { addCameraManufacturer, addCameraNumber } from '../actions/camera_actions';
import { IHomeProps } from '../containers/HomePage';
import { ICameraState } from '../reducers/camera_reducer';
import { kAppName, kCameraManufacturers, kMaxCameraNumber, kRoutes, kVersion } from '../utils/config';

export default class Home extends React.Component<IHomeProps, {}> {
  constructor(props) {
    super(props);
    this.handleCameraNumberUpdate = this.handleCameraNumberUpdate.bind(this);
    this.handleCameraManufacturerUpdate = this.handleCameraManufacturerUpdate.bind(this);
  }

  public handleCameraNumberUpdate(number: number) {
    this.props.dispatch(addCameraNumber(number));
  }

  public handleCameraManufacturerUpdate(manufacturer: string) {
    this.props.dispatch(addCameraManufacturer(manufacturer));
  }

  public render() {
    console.log(this.props);
    return (
      <div className="container">

        <Header />

        <div className="row mt-3">
          <div className="col-8 offset-3 align-self-center">
            <NumCameraInput updateCameraNumber={this.handleCameraNumberUpdate} number={this.props.camera.number} />
            <CameraManufacturerInput updateCameraManufacturer={this.handleCameraManufacturerUpdate} manufacturer={this.props.camera.manufacturer} />
          </div>
        </div>

        <NextButton {...this.props.camera} />

      </div>
    );
  }
}

class NextButton extends React.Component<ICameraState, {}> {
  public render() {
    return (
      <div className="row justify-content-center" hidden={!this.props.number || !this.props.manufacturer}>
        <Link className="btn btn-success m-2" to={kRoutes.ARBORIST}>
          Next <i className="fa fa-pagelines" aria-hidden="true"></i>
        </Link>
      </div>
    );
  }
}

class Header extends React.PureComponent {
  public render() {
    return (
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h4 className="animated slideInLeft">
            Hey, welcome to <span className="text-success">{kAppName} v{kVersion}</span>
          </h4>
          <p>To get started, let's find out what you're working with. </p>
        </div>
      </div>
    );
  }
}

interface INumCameraInputProps {
  updateCameraNumber: (number: number | null) => void;
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
    this.props.updateCameraNumber(val);
  }
  public render() {
    return (
      <div className="form-group row">
        <label htmlFor="cameras" className="col-3 col-form-label text-right">
          Cameras:
          </label>
        <div className="col-6">
          <div className="input-group">

            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-camera-retro"></i>
              </span>
            </div>

            <input
              id="cameras"
              name="cameras"
              type="number"
              placeholder="Number of cameras"
              className="form-control here"
              onChange={this.handleChange}
              value={this.props.number || ''}
            />
          </div>
        </div>
      </div>
    );
  }
}

interface IManufacturerProps {
  updateCameraManufacturer: Function;
  manufacturer: ICameraState['manufacturer'];
}
class CameraManufacturerInput extends React.Component<IManufacturerProps, {}> {
  constructor(pProps) {
    super(pProps);
    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    const m = Object.keys(kCameraManufacturers)[0];
    this.props.updateCameraManufacturer(m);
  }
  public handleChange(e) {
    this.props.updateCameraManufacturer(e.target.value);
  }
  public render() {
    return (
      <div className="form-group row">
        <label htmlFor="manufacturer" className="col-3 col-form-label text-right">
          Manufacturer:
          </label>
        <div className="col-6">
          <select
            className="custom-select d-block w-100"
            id="manufacturer"
            onChange={this.handleChange}
          >
            {
              Object.keys(kCameraManufacturers).map((m, i) => {
                return (<option key={i} value={m}>{kCameraManufacturers[m].name}</option>);
              })
            }
          </select>

        </div>
        <div className="col-12 text-center">
          <SupportedModels manufacturer={this.props.manufacturer} />
        </div>
      </div>
    );
  }
}

class SupportedModels extends React.Component<{ manufacturer: ICameraState['manufacturer']; }, {}> {
  public render() {
    return (
      <small className="text-muted">
        {
          this.props.manufacturer ?
            `Supported models: ${kCameraManufacturers[this.props.manufacturer].supported_models.join(', ')}`
            : null
        }
      </small>
    );
  }
}
