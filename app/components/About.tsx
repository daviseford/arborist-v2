// tslint:disable:max-line-length
import { shell } from 'electron';
import * as React from 'react';
import ButtonLinkTo from '../ui/ButtonLinkTo';
import ButtonOpenExternal from '../ui/ButtonOpenExternal';
import { kAppName, kBonsaiLink, kRoutes } from '../utils/config';

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
    const degree = -10 + (20 * Math.random());
    const transform = `rotate(${degree}deg)`;
    return { transform };
  }
  public asherTilt() {
    // In honor of Asher Katz. RIP
    this.setState({ style: this.getRotation() });
  }
  public render() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <h1>Braum Katz</h1>
          <img
            className="img-responsive img-circle center-block smooth-rotate braumFace"
            style={this.state.style}
            onMouseEnter={this.asherTilt}
            onMouseLeave={this.asherTilt}
          />
          <h3>CEO</h3>
          <div className="col-12 text-left">
            <p><strong>Braum Katz</strong> is a filmmaker.</p>

            <p>And as a filmmaker he wanted to be able to make really beautiful 360 video — cinematic quality, really.
            So he started to look at camera options.</p>

            <p>And what he found was a little disheartening.</p>

            <p>"GoPro has a lot of limitations from a filmmaker's perspective," <strong>Katz</strong> told Technical.ly.</p>

            <p>And the uber-expensive old-school rigs? "It's not really practical for most people."</p>

            <p>So <strong>Katz</strong>, his brother <strong>Asher</strong> and fellow filmmaker friend <strong>Charles Blatz</strong> decided they could make something to split the difference.</p>

            <p><strong>And make something they did.</strong></p>

            <p>The Bonsai team built a proprietary rig that holds up to four DSLR cameras.
            Mounted with the cameras, the Excalibur can create 360 video in stunning 6k resolution.
            As <strong>Katz</strong> put it — "Excalibur eats 4k videos for breakfast."
                The fact that the rig uses DSLR cameras also means that filmmakers have very precise controls over lens use and camera settings.
          </p>

            <p className="text-muted text-left">-- Adapted from&nbsp;
      <a onClick={() => shell.openExternal('https://technical.ly/dc/2017/03/02/bonsai-excalibur-360-camera/')} >
                Technical.ly
      </a>
            </p>
          </div>
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
            <ButtonOpenExternal btn_link={kBonsaiLink} btn_text={'360bonsai.com'} btn_class={'btn btn-md btn-info'} />
            <ButtonLinkTo to={kRoutes.ARBORIST} btn_text={`Back to ${kAppName}`} />
          </div>
        </div>
      </div>
    );
  }
}
