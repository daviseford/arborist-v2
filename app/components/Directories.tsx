import * as path from 'path';
import * as React from 'react';
import { updateDirectory } from '../actions/directory_actions';
import { getMP4FilesSync } from '../api/FileUtil';
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
                    <h5 className="card-title">{this.props.directory.index}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.directory.type}</h6>
                    {this.props.directory.type === kDirectoryPrimary ? PrimaryDirText() : SecondaryDirText()}

                    <ChooseDirectory updateDir={this.props.updateDir} directory={this.props.directory} />

                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div >
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
            const files: IDirState['files'] = getMP4FilesSync(dir_path).map(filename => {
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
            <div className="row">
                <div className="col">
                    <button className={this.props.directory.path ? 'btn-warning' : 'btn-light'}
                        onClick={this.handleClick} >
                        {this.props.directory.path ? 'Change Directory' : 'Choose Directory'}
                    </button>
                </div>
            </div>
        );
    }
}
