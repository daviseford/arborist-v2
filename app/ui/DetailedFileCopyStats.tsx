import * as React from 'react';

interface IDetailedFileCopyStatsProps {
  copy_list: any[];
  t_dir: string;
}

export default class DetailedFileCopyStats extends React.Component<IDetailedFileCopyStatsProps, {}> {
  public render() {
    const copy_list = this.props.copy_list;
    return (
      <div className="row" hidden={copy_list.length === 0}>
        <div className="col-xs-10 col-xs-offset-1">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td># Matches</td>
                  <td>{copy_list.length}</td>
                </tr>
                <tr>
                  <td>Transfer Size (GB)</td>
                  <td>{copy_list.reduce((a, b) => a + b.filesize_gb, 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td># Scenes</td>
                  <td>{copy_list.filter(x => x.dir === this.props.t_dir).length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
