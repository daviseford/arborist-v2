import * as React from 'react';
import { createDir } from '../api/FileUtil';
interface ICreateDirsComponentProps {
  filepath: string;
}
interface ICreateDirsComponentState {
  clicked: boolean;
  done: boolean;
}

export default class CreateDirsComponent extends React.Component<ICreateDirsComponentProps, ICreateDirsComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      done: false,
    };
    this.closeForm = this.closeForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  public handleClick(e) {
    e.preventDefault();
    this.setState({ clicked: true });
  }
  public closeForm(e) {
    e.preventDefault();
    this.setState({ clicked: false });
  }
  public render() {
    return (
      <div className="row" hidden={!this.props.filepath}>
        <div className="col-xs-12 text-center">
          <div className="col-xs-12" hidden={this.state.clicked}>
            <button className="btn btn-md btn-default" onClick={this.handleClick}>
              Create Camera Dirs
            </button>
          </div>

          <CreateDirForm
            filepath={this.props.filepath}
            buttonIsClicked={this.state.clicked}
            buttonIsDone={this.state.done}
            closeForm={this.closeForm}
          />
        </div>
      </div>
    );
  }
}
interface ICreateDirFormProps {
  filepath: string;
  buttonIsClicked: boolean;
  buttonIsDone: boolean;
  closeForm: (...args: any[]) => any;
}
interface ICreateDirFormState {
  text: string;
  dirNum: number;
}
class CreateDirForm extends React.Component<ICreateDirFormProps, ICreateDirFormState> {
  constructor(props) {
    super(props);
    this.state = { dirNum: 0, text: '' };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  public onClick(e) {
    // Create some directories
    e.preventDefault();
    if (this.state.dirNum > 0 && !!this.props.filepath) {
      const dirsCreated: string[] = [];
      const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      for (let i = 0; i < this.state.dirNum; i++) {
        createDir(this.props.filepath, alphabet[i]);
        dirsCreated.push(alphabet[i]);
      }
      this.setState({
        text: `Created directories ${dirsCreated[0]}-${dirsCreated[dirsCreated.length - 1]}`,
      });
    } else {
      this.setState({ text: `Please enter a valid number of directories` });
    }
  }
  public handleChange(e) {
    this.setState({ dirNum: e.target.value });
  }
  public render() {
    return (
      <div className={this.props.buttonIsClicked ? 'form-inline' : 'hidden'} style={{ marginTop: '1%' }}>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-8 col-sm-3">
              <label htmlFor="dirNumInput" className="small">
                How many cameras?
              </label>
            </div>
            <div className="col-xs-4 col-sm-4">
              <input
                className="form-control"
                id="dirNumInput"
                onChange={this.handleChange}
                value={this.state.dirNum}
              />
            </div>
            <div className="col-xs-12 col-sm-5">
              <button className="btn btn-sm btn-default" onClick={this.onClick}>
                Create
              </button>
              &nbsp;
              <button className="btn btn-sm btn-default" onClick={this.props.closeForm}>
                <span className="glyphicon glyphicon-remove"> </span>
              </button>
            </div>
            &nbsp;
          </div>

          <div className="row">{this.state.text}</div>
        </div>
      </div>
    );
  }
}
