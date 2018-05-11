// tslint:disable:max-line-length
import * as React from 'react';
import { Link } from 'react-router-dom';
import { addCameraManufacturer, addCameraNumber } from '../actions/camera_actions';
import { addPrimaryDirectory, addSecondaryDirectory, clearDirectories } from '../actions/directory_actions';
import { IHomeProps } from '../containers/HomePage';
import { ICameraState } from '../definitions/state';
import {
  kAppName,
  kCameraManufacturers,
  kMaxCameraNumber,
  kRoutes,
  kStyles,
  // kVersion
} from '../utils/config';

export default class Home extends React.Component<IHomeProps, {}> {
  constructor(props) {
    super(props);
    this.handleCameraNumberUpdate = this.handleCameraNumberUpdate.bind(this);
    this.handleCameraManufacturerUpdate = this.handleCameraManufacturerUpdate.bind(this);
    this.handleDirectoryInitialization = this.handleDirectoryInitialization.bind(this);
  }

  public handleCameraNumberUpdate(number: number) {
    this.props.dispatch(addCameraNumber(number));
  }

  public handleCameraManufacturerUpdate(manufacturer: string) {
    this.props.dispatch(addCameraManufacturer(manufacturer));
  }

  public handleDirectoryInitialization() {
    // Only clear directories if we've changed the camera number
    if (this.props.camera.number && this.props.camera.number !== this.props.directories.length) {
      this.props.dispatch(clearDirectories());
      for (let i = 0; i < this.props.camera.number; i++) {
        const fn = i === 0 ? addPrimaryDirectory : addSecondaryDirectory;
        this.props.dispatch(fn(i));
      }
    }
  }

  public render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row my-5"></div>
        <div className="row my-4"></div>
        <div className="row align-items-center">
          <div className="col my-auto">

            <Header />

            <div className="row mt-3">
              <div className="col-8 offset-3 align-self-center">
                <NumCameraInput updateCameraNumber={this.handleCameraNumberUpdate} number={this.props.camera.number} />
                <CameraManufacturerInput updateCameraManufacturer={this.handleCameraManufacturerUpdate} manufacturer={this.props.camera.manufacturer} />
              </div>
            </div>

            <NextButton {...this.props.camera} initializeDirectories={this.handleDirectoryInitialization} />

          </div>
        </div>
        <div className="row my-5"></div>
      </div>
    );
  }
}

interface INextButtonProps {
  manufacturer: string;
  model: string;
  number: number | null;
  initializeDirectories: Function;
}
class NextButton extends React.Component<INextButtonProps, {}> {
  public render() {
    return (
      <div className="row justify-content-center" hidden={!this.props.number || !this.props.manufacturer}>
        <Link className={kStyles.BTN_NEXT} to={kRoutes.DIRECTORIES} onClick={() => this.props.initializeDirectories()}>
          Next&nbsp;&nbsp;&nbsp;<i className="fa fa-chevron-right" aria-hidden="true"></i>
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
          <h1 className="">
            Hey, welcome to <span className="text-success">{kAppName}</span>!
          </h1>
          <p className="lead pt-2">To get started, let's find out what you're working with. </p>
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
          # Cameras:
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
      this.props.manufacturer ?
        <div className="row mt-2">
          <div className="col-3 small text-right">Supported models:</div>
          <div className="col-6 small text-left">{kCameraManufacturers[this.props.manufacturer].supported_models.join(', ')}</div>
        </div>
        : null

    );
  }
}
