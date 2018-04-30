// tslint:disable:max-line-length
import * as React from 'react';
import ButtonLinkTo from '../ui/ButtonLinkTo';
import { kAppName, kRoutes, kVersion } from '../utils/config';

export default class Home extends React.Component {
  public render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '7%' }}>

          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2 text-center">
              <h1 className="animated slideInLeft">Welcome to <span className="text-success">{kAppName} v{kVersion}</span></h1>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 animated zoomIn">
              <img className="img-responsive center-block iconPic" />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 text-center">
              <ButtonLinkTo to={kRoutes.ARBORIST} btn_class={'btn btn-lg btn-success'} btn_text={'Get Started'} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
