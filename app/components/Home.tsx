import * as React from 'react';
import ButtonLinkTo from '../ui/ButtonLinkTo';
// import icon_src from "./../img/arborist.png";

export default class Home extends React.Component {
  public render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '7%' }}>

          <div className="row">
            <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2 text-center">
              <h1 className="animated slideInLeft">Welcome to <span className="text-success">Arborist v2.0</span></h1>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 animated zoomIn">
              {/* <img src={icon_src} className="img-responsive center-block" /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 text-center">
              <ButtonLinkTo to={'/arborist'} btn_class={'btn btn-lg btn-success'} btn_text={'Get Started'} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
