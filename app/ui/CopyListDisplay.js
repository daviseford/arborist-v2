import React, {Component} from "react";
import path from "path";


export default class CopyListDisplay extends Component {
  static propTypes = {
    copy_list: React.PropTypes.array.isRequired,
    filepath: React.PropTypes.string.isRequired,
    isSorted: React.PropTypes.bool.isRequired,
  };

  render() {
    return (
        <div className="row" hidden={!this.props.filepath || this.props.copy_list.length === 0}>
          <div className="col-xs-12">
            <table className="table table-striped table-bordered">
              <thead>
              <tr className="text-center">
                <td><h5>Source</h5></td>
                <td></td>
                <td><h5>Destination</h5></td>
                <td><h5>Size (GB)</h5></td>
                <td><h5>Status</h5></td>
              </tr>
              </thead>
              <tbody>
              {this.props.copy_list.map((x, index) => {
                return <CopyRow copy_obj={x} key={index}/>
              })}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

class CopyRow extends Component {
  static propTypes = {
    copy_obj: React.PropTypes.object.isRequired
  };

  getFilepath(filepath) {
    return filepath.split(path.sep).slice(filepath.split(path.sep).length - 2).join(path.sep)
  }

  render() {
    const statusIcon = this.props.copy_obj.copying ? 'glyphicon glyphicon-refresh gly-spin' : this.props.copy_obj.done ? 'glyphicon glyphicon-ok text-success' : 'glyphicon glyphicon-remove text-danger';
    return (
        <tr className="text-center">
          <td>{this.getFilepath(this.props.copy_obj.filepath)}</td>
          <td><span className="glyphicon glyphicon-arrow-right text-success"> </span></td>
          <td>{this.getFilepath(this.props.copy_obj.dest)}</td>
          <td>{this.props.copy_obj.filesize_gb.toFixed(2)}</td>
          <td><span className={statusIcon}> </span></td>
        </tr>
    )
  }
}