import * as React from 'react';
import XMLSorter from '../api/XML_Sorter';

interface IProps {
  filepath: string;
  handleSorter: () => any;
}

export default class AnalyzeButton extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public onClick(e) {
    e.preventDefault();
    console.log('Starting analysis');
    const sorter = new XMLSorter(this.props.filepath, this.props.handleSorter, false);
    sorter.process();
  }

  public render() {
    return (
      <button
        className="btn btn-md btn-warning"
        onClick={this.onClick}
        disabled={!this.props.filepath}>
        Analyze
        </button>
    );
  }

}
