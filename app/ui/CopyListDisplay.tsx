import * as path from 'path';
import * as React from 'react';
import { ICopyList } from '../definitions/copylist';

interface IProps {
  copy_list: ICopyList[];
  filepath: string;
  isSorted: boolean;
}

export default class CopyListDisplay extends React.Component<IProps> {

  public render() {
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
                return <CopyRow copy_obj={x} key={index} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class CopyRow extends React.Component<{ copy_obj: ICopyList }> {

  public getFilepath(filepath) {
    return filepath.split(path.sep).slice(filepath.split(path.sep).length - 2).join(path.sep);
  }

  public render() {
    // tslint:disable-next-line:max-line-length
    const statusIcon = this.props.copy_obj.copying ? 'glyphicon glyphicon-refresh gly-spin' : this.props.copy_obj.done ? 'glyphicon glyphicon-ok text-success' : 'glyphicon glyphicon-remove text-danger';
    return (
      <tr className="text-center">
        <td>{this.getFilepath(this.props.copy_obj.filepath)}</td>
        <td><span className="glyphicon glyphicon-arrow-right text-success"> </span></td>
        <td>{this.getFilepath(this.props.copy_obj.dest)}</td>
        <td>{this.props.copy_obj.filesize_gb.toFixed(2)}</td>
        <td><span className={statusIcon}> </span></td>
      </tr>
    );
  }
}
