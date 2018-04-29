import * as React from 'react';
import ButtonLinkTo from '../ui/ButtonLinkTo';
import ButtonOpenExternal from '../ui/ButtonOpenExternal';

export default class About extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="container" style={{ marginTop: '9%' }}>
        <Braum />
        <Buttons />
      </div>
    );
  }
}
interface IBraumState {
  style: { transform?: string };
}
class Braum extends React.Component<{}, IBraumState> {
  constructor(props) {
    super(props);
    this.state = { style: {} };
    this.asherTilt = this.asherTilt.bind(this);
  }
  /**
   * Asher Katz's original code on sweetpeas.com, translated for usage here
   *
   * $('#gallery img').mouseenter(function(){
   *   var degree = -10+20*(Math.random());
   *   $(this).rotate({animateTo:degree, duration:50});
   * });
   *
   * $('#gallery img').mouseleave(function(){
   *   var degree = -10+20*(Math.random());
   *   $(this).rotate({animateTo:degree, duration:50});
   * });
   *
   * @returns {{transform: string}}
   */
  public getRotation() {
    const degree = -10 + 20 * Math.random();
    const rotation = `rotate(${degree}deg)`;
    return { transform: rotation };
  }
  public asherTilt() {
    // In honor of Asher Katz. RIP
    this.setState({ style: this.getRotation() });
  }
  public render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <h1>Braum Katz</h1>
          <img
            className="img-responsive img-circle center-block smooth-rotate"
            style={this.state.style}
            onMouseEnter={this.asherTilt}
            onMouseLeave={this.asherTilt}
            src={'./../app/img/braum.jpg'}
          />
          <h3>CEO</h3>
        </div>
      </div>
    );
  }
}
class Buttons extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <div className="form-group">
            <ButtonOpenExternal btn_link={'http://360bonsai.com'} btn_text={'360bonsai.com'} />
            <ButtonLinkTo to={'arborist'} btn_text={'Back to Arborist'} />
          </div>
        </div>
      </div>
    );
  }
}
