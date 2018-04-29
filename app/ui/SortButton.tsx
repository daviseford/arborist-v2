import * as React from 'react';
import XMLSorter from '../api/XML_Sorter';

interface IProps {
  filepath: string;
  handleSorter: () => any;
  isSorting: boolean;
  isSorted: boolean;
}

export default class SortButton extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public onClick(e) {
    e.preventDefault();
    const sorter = new XMLSorter(this.props.filepath, this.props.handleSorter, true);
    sorter.process();
  }

  public render() {
    const { isSorted, isSorting } = this.props;
    const btn_class = isSorted ? 'btn btn-md btn-success' : 'btn btn-md btn-default';
    const btn_text = isSorted ? 'Restart Pruning' : isSorting ? 'Pruning...' : 'Start Pruning';
    const span_class = isSorted ? 'glyphicon glyphicon-ok' : isSorting ? `glyphicon glyphicon-repeat gly-spin` : '';
    return (
      <button className={btn_class} onClick={this.onClick} disabled={!this.props.filepath}>
        {btn_text} <span className={span_class}> </span></button>
    );
  }

}
