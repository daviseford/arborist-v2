import * as React from 'react';
import { updateDirectory } from '../actions/directory_actions';
import { IDirectoriesProps } from '../containers/DirectoriesPage';
import { ICameraState, IDirState } from '../definitions/state';
import { kDirectoryPrimary } from '../utils/config';

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
        this.handleDirUpdate = this.handleDirUpdate.bind(this);
    }

    public handleDirUpdate(e) {
        e.preventDefault();
        const a = this.props.directory;
        a.files = [{
            filename: 'hi',
            filepath: 'davis',
        }];
        this.props.updateDir(a);
    }

    public render() {
        console.log(this.props);
        return (
            <div className="card col-5 mx-2 mt-2">
                <div className="card-body">
                    <h5 className="card-title">{this.props.directory.index}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.directory.type}</h6>
                    {this.props.directory.type === kDirectoryPrimary ? PrimaryDirText() : SecondaryDirText()}
                    <button className="btn btn-md btn-light" onClick={this.handleDirUpdate}>update dir</button>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div >
        );
    }
}
