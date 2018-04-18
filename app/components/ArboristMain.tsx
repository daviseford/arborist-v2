import * as path from 'path';
import * as React from 'react';
import Types from '../api/Types';
import AnalyzeButton from '../ui/AnalyzeButton';
import ButtonLinkTo from '../ui/ButtonLinkTo';
import ButtonOpenExternal from '../ui/ButtonOpenExternal';
import CopyListDisplay from '../ui/CopyListDisplay';
import CreateDirsComponent from '../ui/CreateDirsComponent';
import DetailedFileCopyStats from '../ui/DetailedFileCopyStats';
import FilepathDisplay from '../ui/FilepathDisplay';
import OpenDirectoryDialogButton from '../ui/OpenDirectoryDialogButton';
import ProgressBar from '../ui/ProgressBar';
import SortButton from '../ui/SortButton';

export default class ArboristMain extends React.Component {
  public state: {
    console_output: string;
    copy_list: string[];
    dirs: string[];
    filepath: string;
    isSorted: boolean;
    isSorting: boolean;
  };
  private _isMounted: boolean;

  constructor(props) {
    super(props);
    this.setState({
      // tslint:disable-next-line:max-line-length
      console_output: 'Welcome to Arborist\nSelect the directory that contains your camera uploads in folders A, B, C, etc...',
      copy_list: [],
      dirs: [],
      filepath: '',
      isSorted: false,
      isSorting: false,
    });

    this.handleAllFilesDone = this.handleAllFilesDone.bind(this);
    this.handleAnalysis = this.handleAnalysis.bind(this);
    this.handleCopyListUpdate = this.handleCopyListUpdate.bind(this);
    this.handleFileDone = this.handleFileDone.bind(this);
    this.handleFilesStart = this.handleFilesStart.bind(this);
    this.handleSorterUpdates = this.handleSorterUpdates.bind(this);
    this.updateConsoleOutput = this.updateConsoleOutput.bind(this);
    this.updateFilepath = this.updateFilepath.bind(this);
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public updateFilepath(filepath, dirs) {
    this.setState({
      copy_list: [],
      dirs,
      filepath,
      isSorted: false,
      isSorting: false,
    });
  }

  public updateConsoleOutput(text) {
    const oldText = this.state.console_output;
    const newText = `${oldText}\n${text}`;
    this.setState({ console_output: newText });
  }

  public handleSorterUpdates(type, data) {
    // Check that our component is still mounted
    // We don't need any of these updates if we've moved on
    if (!this._isMounted) { return; }

    if (Types.general === type) {
      this.updateConsoleOutput(data);
    } else if (Types.copy_file_done === type) {
      this.handleFileDone(data);
    } else if (Types.copy_files_done === type) {
      this.handleAllFilesDone(data);
    } else if (Types.copy_files_start === type) {
      this.handleFilesStart(data);
    } else if (Types.copy_list_update === type) {
      this.handleCopyListUpdate(data);
    } else if (Types.error === type) {
      this.updateConsoleOutput(`ERROR: ${data}`);
    } else if (Types.analysis === type) {
      this.handleAnalysis(data);
    } else if (Types.xml_copy_done === type) {
      this.updateConsoleOutput('Associated XML files copied');
    }

  }

  public handleCopyListUpdate(data) {
    this.setState({ copy_list: data });
  }

  public handleAnalysis(data) {
    this.updateConsoleOutput(`Analysis complete. Check below for results.`);
    this.setState({ copy_list: data });
  }

  public handleFilesStart(data) {
    const total_transfer_size_gb = data.reduce((a, b) => b.filesize_gb + a, 0);
    this.updateConsoleOutput(`Now copying ${data.length} files... ${total_transfer_size_gb.toFixed(3)}gb`);
    this.setState({ isSorted: false, isSorting: true });
  }

  public handleAllFilesDone(data) {
    this.updateConsoleOutput('All done :) Enjoy!');
    this.setState({ isSorted: true, isSorting: false, copy_list: data });
  }

  public handleFileDone(data) {
    const filepath = data.filepath.split(path.sep).slice(data.filepath.split(path.sep).length - 2).join(path.sep);
    const dest = data.dest.split(path.sep).slice(data.dest.split(path.sep).length - 2).join(path.sep);
    this.updateConsoleOutput(`${filepath} --> ${dest}: Done!`);
  }

  public render() {
    return (
      <div className="col-xs-8 col-xs-offset-2" style={{ marginTop: '9%' }}>

        <div className="row">
          <div className="col-xs-12 text-center">
            <OpenDirectoryDialogButton handleClick={this.updateFilepath.bind(this)} />
          </div>
        </div>

        <FilepathDisplay filepath={this.state.filepath} dirs={this.state.dirs} />

        <CreateDirsComponent filepath={this.state.filepath} />

        <div className="row" hidden={!this.state.filepath} style={{ marginTop: '2%' }}>
          <div className="col-xs-12 text-center">
            <div className="form-group">

              <AnalyzeButton
                filepath={this.state.filepath}
                handleSorter={this.handleSorterUpdates.bind(this)}
              />

              <SortButton
                filepath={this.state.filepath}
                handleSorter={this.handleSorterUpdates.bind(this)}
                isSorting={this.state.isSorting}
                isSorted={this.state.isSorted}
              />
            </div>
          </div>
        </div>

        {/* <ConsoleArea console_output={this.state.console_output} /> */}

        <div className="text-center" hidden={this.state.copy_list.length === 0}>
          <h3>Pruning</h3>
        </div>

        <DetailedFileCopyStats copy_list={this.state.copy_list} t_dir={this.state.dirs[0] || 'A'} />

        <ProgressBar copy_list={this.state.copy_list} />

        <CopyListDisplay copy_list={this.state.copy_list}
          isSorted={this.state.isSorted}
          filepath={this.state.filepath} />

        <div className="row" style={{ marginTop: '2%' }}>
          <div className="col-xs-12 text-center">
            <div className="form-group">
              <ButtonLinkTo to={'about'} btn_text={'About'} />
              <ButtonLinkTo to={'faq'} btn_text={'FAQ'} />
              <ButtonOpenExternal btn_link={'https://github.com/daviseford/arborist-electron/issues/new'}
                btn_text={'Create Issue'} />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

// TODO fix
// class ConsoleArea extends React.Component {
//   public render() {
//     return (
//       <div className="row" style={{ marginTop: '2%' }}>
//         <div className="col-xs-12">
//           <textarea className="form-control" rows="7" value={this.props.console_output} readOnly="true"> </textarea>
//         </div>
//       </div>
//     );
//   }
// }
