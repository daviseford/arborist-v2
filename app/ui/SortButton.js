import React, {Component} from "react";
import XML_Sorter from "../api/XML_Sorter";

export default class SortButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    filepath: React.PropTypes.string.isRequired,
    handleSorter: React.PropTypes.func.isRequired,
    isSorting: React.PropTypes.bool.isRequired,
    isSorted: React.PropTypes.bool.isRequired,
  };

  onClick(e) {
    e.preventDefault();
    const sorter = new XML_Sorter(this.props.filepath, this.props.handleSorter, true);
    sorter.process();
  }

  render() {
    const {isSorted, isSorting} = this.props;
    const btn_class = isSorted ? 'btn btn-md btn-success' : 'btn btn-md btn-default';
    const btn_text = isSorted ? 'Restart Pruning' : isSorting ? 'Pruning...' : 'Start Pruning';
    const span_class = isSorted ? 'glyphicon glyphicon-ok' : isSorting ? `glyphicon glyphicon-repeat gly-spin` : '';
    return (
        <button className={btn_class} onClick={this.onClick} disabled={!this.props.filepath}>
          {btn_text} <span className={span_class}> </span></button>
    )
  }

}