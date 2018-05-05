import * as path from 'path';
import * as React from 'react';
import { updateDirectory } from '../actions/directory_actions';
import { getDirNameFromFilepath, getMixedFilesSync } from '../api/FileUtil';
import { getAssociatedXMLFile } from '../api/Sony_XML';
import { IDirectoriesProps } from '../containers/DirectoriesPage';
import { ICameraState, IDirState } from '../definitions/state';
import { kDirectoryPrimary } from '../utils/config';
const { dialog } = require('electron').remote;

export default class Directories extends React.Component<IDirectoriesProps, {}> {
    constructor(pProps) {
        super(pProps);
        this.updateDir = this.updateDir.bind(this);
    }

    public updateDir(directory: IDirState) {
        this.props.dispatch(updateDirectory(directory));
    }

    public render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.props.directories.map((x, i) => {
                        return <DirectoryCard updateDir={this.updateDir}
                            key={i} directory={x}
                            camera={this.props.camera} />;
                    })}
                </div>
            </div>
        );
    }
}

const SecondaryDirText = () => (
    <p className="card-text">
        This is a <strong>secondary</strong> directory.
    </p>
);

const PrimaryDirText = () => (
    <p className="card-text">
        This is your <strong>primary</strong> directory. It is the source of truth for matching files.
    </p>
);

interface IDirectoryCardProps {
    camera: ICameraState;
    directory: IDirState;
    updateDir: (directory: IDirState) => void;
}
class DirectoryCard extends React.PureComponent<IDirectoryCardProps, any> {
    constructor(pProps) {
        super(pProps);
    }

    public render() {
        console.log(this.props);
        return (
            <div className="card col-5 mx-2 mt-2">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.directory.path ?
                            getDirNameFromFilepath(this.props.directory.path)
                            : this.props.directory.index
                        }&nbsp;
                        <span className="small text-muted">- {this.props.directory.type}</span>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.directory.type}</h6>
                    {this.props.directory.type === kDirectoryPrimary ? PrimaryDirText() : SecondaryDirText()}

                    <ChooseDirectory updateDir={this.props.updateDir} directory={this.props.directory} />

                    <a href="#" className="card-link">Card link</a>
                    {this.props.directory.path ? <FileTable files={this.props.directory.files} /> : null}
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div >
        );
    }
}

class FileTable extends React.PureComponent<{ files: IDirState['files'] }, any> {

    public render() {
        const files = this.props.files || [];
        const mp4_files = files.filter(x => x.filename.toUpperCase().endsWith('.MP4'));
        const xml_files = files.filter(x => x.filename.toUpperCase().endsWith('.XML'));

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">MP4</th>
                        <th scope="col">XML</th>
                        {/* <th scope="col">Handle</th> */}
                    </tr>
                </thead>

                <tbody>
                    {mp4_files.length === 0 ?
                        <tr className="table-danger">
                            <th scope="row">None</th>
                            <td><i className="fa fa-times text-danger"></i></td>
                        </tr>
                        :
                        mp4_files.map((file, i) => {
                            const xml = getAssociatedXMLFile(file.filename, xml_files);
                            return (
                                <tr key={i} className={xml ? '' : 'table-danger'}>
                                    <th scope="row">{file.filename}</th>
                                    <td>
                                        {
                                            xml ?
                                                <i className="fa fa-check text-success"></i>
                                                : <i className="fa fa-times text-danger"></i>
                                        }
                                    </td>
                                </tr>
                            );
                        })}

                </tbody>

            </table>
        );
    }

}

interface IChooseDirectoryProps {
    directory: IDirState;
    updateDir: (directory: IDirState) => void;
}

class ChooseDirectory extends React.Component<IChooseDirectoryProps, {}> {
    constructor(props: IChooseDirectoryProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e) {
        e.preventDefault();
        const filepath = dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (filepath && !!filepath[0]) {
            const dir_path = filepath[0];
            const files: IDirState['files'] = getMixedFilesSync(dir_path).map(filename => {
                return { filename, filepath: `${dir_path}${path.sep}${filename}` };
            });
            const payload: IDirState = {
                ...this.props.directory,
                files,
                path: dir_path,
            };
            this.props.updateDir(payload);
        }

    }
    public render() {
        return (
            <div className="row justify-content-center">
                <div className="col text-center">
                    <button className={this.props.directory.path ? 'btn-warning' : 'btn-light'}
                        onClick={this.handleClick} >
                        {this.props.directory.path ? 'Change Directory' : 'Choose Directory'}
                    </button>
                </div>
            </div>
        );
    }
}
