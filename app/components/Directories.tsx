import * as React from 'react';
import { IDirectoriesProps } from '../containers/DirectoriesPage';
import { ICameraState } from '../reducers/camera_reducer';
import { IDirState } from '../reducers/directory_reducer';
import { kDirectoryPrimary } from '../utils/config';

export default class Directories extends React.Component<IDirectoriesProps, {}> {
    constructor(pProps) {
        super(pProps);
    }

    public render() {
        console.log(this.props);
        // https://stackoverflow.com/questions/4852017/how-to-initialize-an-arrays-length-in-javascript
        // const cam_num = Array.from(Array(this.props.camera.number));
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.props.directories.map((x, i) => {
                        return <DirectoryCard key={i} directory={x} camera={this.props.camera} />;
                    })}

                </div>
            </div>
        );
    }
}

const tSecondaryDirectory = () => (
    <p className="card-text">
        This is a <strong>secondary</strong> directory.
    </p>
);

const tPrimaryDirectory = () => (
    <p className="card-text">
        This is your <strong>primary</strong> directory. It is the source of truth for matching files.
    </p>
);

interface IDirectoryCardProps {
    camera: ICameraState;
    directory: IDirState;
}
class DirectoryCard extends React.PureComponent<IDirectoryCardProps, any> {
    public render() {
        return (
            <div className="card col-5 mx-2 mt-2">
                <div className="card-body">
                    <h5 className="card-title">{this.props.directory.index}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.directory.type}</h6>
                    {this.props.directory.type === kDirectoryPrimary ? tPrimaryDirectory() : tSecondaryDirectory()}
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div >
        );
    }
}
