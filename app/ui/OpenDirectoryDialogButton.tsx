import * as React from 'react';
import { getDirectories_sync } from '../api/FileUtil';
const { dialog } = require('electron').remote;

interface IOpenDirectoryDialogButtonProps {
  handleClick: (...args: any[]) => any;
}

export default class OpenDirectoryDialogButton extends React.Component<IOpenDirectoryDialogButtonProps, {}> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public onClick(e) {
    e.preventDefault();
    const filepath = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (filepath && !!filepath[0]) {
      const dirs = getDirectories_sync(filepath[0]);
      this.props.handleClick(filepath[0], dirs);
    }
  }

  public render() {
    return (
      <button className="btn btn-md btn-info" onClick={this.onClick}>
        Select Working Directory
      </button>
    );
  }
}
