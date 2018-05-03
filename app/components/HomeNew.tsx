// tslint:disable:max-line-length
import * as React from 'react';

import { kAppName, kVersion } from '../utils/config';

export default class Home extends React.Component {
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

            </div>
          </div>

        </div>
      </div>
    );
  }
}

class NumCameraInput extends React.Component {
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
              value={this.state.dirNum}
            />
          </div>
        </div>
      </div>
    );
  }
}
