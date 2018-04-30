import * as React from 'react';
import ButtonLinkTo from '../ui/ButtonLinkTo';
import { kAppName, kRoutes } from '../utils/config';

export default class FAQ extends React.Component {
  public render() {
    return (
      <div className="container">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">

          <div className="row">
            <Entry1 />
            <Entry2 />
            <Entry3 />
          </div>

          <div className="row">
            <div className="col-xs-12 text-center">
              <ButtonLinkTo to={kRoutes.ARBORIST} btn_text={`Back to ${kAppName}`} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class Entry1 extends React.Component {
  public render() {
    return (
      <div className="col-xs-12">
        <h2>XML Required</h2>
        <p>Long story short - you know those .XML files that come bundled with your camera's output?
          Yeah, Arborist needs those. Please ensure that your XML files are copy/pasted into the
          directory along with the video file.
        </p>
      </div>
    );
  }
}

class Entry2 extends React.Component {
  public render() {
    return (
      <div className="col-xs-12">
        <h2>Huh? A, B, C, D directories?</h2>
        <p>When you come home from a shoot with the Bonsai Excalibur,
          you will end up with <strong>four cameras</strong> worth of content.</p>
        <p>
          The easiest way to sort these files with Arborist is to use directories named A, B, C, D, E, etc...
          Arborist is capable of sorting up to 26 cameras. If you need support for more cameras, please contact us.</p>
        <p>Drag all of your files <strong>(including XML!)</strong> from
          your primary camera to directory A. Directory A is considered the Source of Truth regarding scene creation.
          </p>
        <p>
          <span className="text-danger">
            Arborist will ignore any directories that do not follow the A, B, C, D, etc. convention.
          </span>
        </p>
      </div>
    );
  }
}

class Entry3 extends React.Component {
  public render() {
    return (
      <div className="col-xs-12">
        <h2>How does Arborist work?</h2>
        <p>
          Arborist begins by gathering the attributes of all of the files in the A, B, C, and D directories.
          If an XML file is present, Arborist scans it for information.
          If there are missing XML files, you're going to have issues.
          Make sure you have all of your XML/MP4 files in the directory!</p>
        <p>
          <strong>Please note: XML sorting is the superior - and only - sorting option.
          Make a real effort to sync up your camera timestamps and to start and stop them close together while filming.
          It will make this absolutely painless.</strong>
        </p>

        <p>
          Once you click <strong>"Analyze"</strong> or <strong>"Start Pruning"</strong>,
          Arborist begins matching files based on <strong>Overlap</strong>.
          If the timestamps of files from Camera A and Camera B overlap, they are considered a match.
          Once again, note that this requires accurate timestamps - sync your cameras BEFORE shooting,
          and spare yourself the pain of the less-precise filesize sorter.
          </p>

        <p>
          After being sorted, the files will be placed in a directory called <code>Scenes</code>.
          For example, the first file in directory A, as well as any matches from the other directories,
          would be placed in <code>Scenes\Scene_1</code>.</p>
        <p>
          You may choose to run <strong>"Analyze"</strong> instead of <strong>"Start Pruning"</strong>
          - you will simply see the projected transfer without initiating the file copying.</p>
      </div>
    );
  }
}
