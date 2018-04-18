import React, {Component} from "react";
import {getDirectories_sync} from "../api/FileUtil";
const {dialog} = require('electron').remote;


export default class OpenDirectoryDialogButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  static propTypes = {
    handleClick: React.PropTypes.func.isRequired
  };

  onClick(e) {
    e.preventDefault();
    const filepath = dialog.showOpenDialog({properties: ['openDirectory']});
    if (filepath && !!filepath[0]) {
      const dirs = getDirectories_sync(filepath[0]);
      this.props.handleClick(filepath[0], dirs);
    }
  }

  render() {
    return (
        <button className="btn btn-md btn-info" onClick={this.onClick}>Select Working Directory</button>
    )
  }

}