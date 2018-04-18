import React, {Component} from "react";
import XML_Sorter from "../api/XML_Sorter";


export default class AnalyzeButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    filepath: React.PropTypes.string.isRequired,
    handleSorter: React.PropTypes.func.isRequired,
  };

  onClick(e) {
    e.preventDefault();
    console.log('Starting analysis');
    const sorter = new XML_Sorter(this.props.filepath, this.props.handleSorter, false);
    sorter.process();
  }

  render() {
    return (
        <button
            className="btn btn-md btn-warning"
            onClick={this.onClick}
            disabled={!this.props.filepath}>
          Analyze
        </button>
    )
  }

}