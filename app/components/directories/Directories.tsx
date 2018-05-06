
import * as React from 'react';
import { updateDirectory } from '../../actions/directory_actions';
import { IDirectoriesProps } from '../../containers/DirectoriesPage';
import { IDirState } from '../../definitions/state';
import DirectoryCard from './DirectoryCard';

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
