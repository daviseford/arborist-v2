import React, {Component} from "react";
import {getMP4FilesSync} from "../api/FileUtil";
import path from "path";

export default class FilepathDisplay extends Component {
  static propTypes = {
    filepath: React.PropTypes.string.isRequired,
    dirs: React.PropTypes.array.isRequired,
  };

  render() {
    return (
        <div className="row" hidden={!this.props.filepath}>

          <div className="col-xs-12 text-center">
            <h5>
              Current Working Dir<br />
              {this.props.filepath}
            </h5>
          </div>

          <div className="col-xs-12">
            <SubDirTable {...this.props}/>
          </div>

        </div>
    )
  }
}

class SubDirTable extends Component {
  static propTypes = {
    filepath: React.PropTypes.string.isRequired,
    dirs: React.PropTypes.array.isRequired
  };

  render() {
    return (
        <table className="table table-bordered table-striped">
          <thead>
          <tr>
            <td className="text-center"><h5>Sub-Directory</h5></td>
            <td className="text-center"><h5>MP4 Files</h5></td>
          </tr>
          </thead>
          <tbody>
          {this.props.dirs.map((file, index) => {
            return (
                <tr key={index + '_row'}>
                  <td key={index + '_filename'}>{file}</td>
                  <td key={index + '_mp4'}>
                    {getMP4FilesSync(path.join(this.props.filepath, file)).reduce((a, b) => a + 1, 0)}
                  </td>
                </tr>
            )
          })}
          </tbody>
        </table>
    )
  }
}
