import * as moment from 'moment';
import * as React from 'react';
import { ICopyList } from '../definitions/copylist';

interface IProps {
  copy_list: ICopyList[];
}

export default class ProgressBar extends React.Component<IProps> {
  public state: {
    percentage: number;
  };

  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      // avg_sec_per_gb: 0,
    };
    this.getAvgSecPerGB = this.getAvgSecPerGB.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    const numDone = nextProps.copy_list.reduce((a, b) => {
      if (b.done) { return a + 1; }
      return a;
    }, 0);

    if (numDone === 0 && this.state.percentage === 0) { return; }

    const total = nextProps.copy_list.filter(x => !!x.dest).length;
    const percentage = (numDone / total) * 100 || 0;

    this.setState({
      percentage: Math.trunc(percentage),
      // avg_sec_per_gb: this.getAvgSecPerGB(),
    });
  }

  public getAvgSecPerGB() {
    // TODO Take advantage of this to display est. time remaining
    const copy_list_done = this.props.copy_list.filter(x => x.start_time && x.end_time);
    if (copy_list_done.length === 0) { return 0; }
    const num_done = copy_list_done.map((x) => {
      const end = x.end_time || moment();
      const duration = moment.duration(end.diff(x.start_time));
      const seconds = duration.asSeconds();
      return seconds / x.filesize_gb;
    });
    const avg_sec_per_gb = num_done.reduce((a, b) => a + b, 0) / num_done.length;
    return avg_sec_per_gb.toFixed(2);
  }

  public render() {
    return (
      <div className="row" hidden={this.props.copy_list.filter(x => x.dest).length === 0}>
        <div className="col-xs-12">
          <div className="progress">
            <div className="progress-bar" role="progressbar"
              style={{ minWidth: '2.5em', width: `${this.state.percentage}%` }}>
              {`${this.state.percentage}%`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
