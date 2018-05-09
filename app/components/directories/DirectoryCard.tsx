import * as path from 'path';
import * as React from 'react';
import { getMixedFilesSync, getShortDirPath } from '../../api/FileUtil';
import { getAssociatedXMLFile } from '../../components/copylist/helpers/sony';
import { ICameraState, IDirState } from '../../definitions/state';
import { kDirectoryPrimary } from '../../utils/config';
const { dialog } = require('electron').remote;

interface IDirectoryCardProps {
    camera: ICameraState;
    directory: IDirState;
    updateDir: (directory: IDirState) => void;
}

export default class DirectoryCard extends React.PureComponent<IDirectoryCardProps, any> {
    constructor(pProps) {
        super(pProps);
    }

    public render() {
        console.log(this.props);
        const dir_path = this.props.directory.path;
        return (
            <div className="card col-5 mx-2 mt-2">
                <div className="card-body">
                    <h5 className="card-title">
                        {dir_path ? getShortDirPath(dir_path) : `Camera ${this.props.directory.index + 1}`}
                        &nbsp;
                        <span className="small text-muted">-&nbsp;
                        {this.props.directory.type === kDirectoryPrimary ? 'Primary' : 'Secondary'}
                        </span>
                    </h5>

                    {dir_path ? <h6 className="card-subtitle mb-2 text-muted small">{dir_path}</h6> : null}

                    {this.props.directory.type === kDirectoryPrimary ? PrimaryDirText() : SecondaryDirText()}

                    <ChooseDirectory updateDir={this.props.updateDir} directory={this.props.directory} />

                    {dir_path ? <FileTable files={this.props.directory.files} /> : null}

                </div>
            </div >
        );
    }
}

class FileTable extends React.PureComponent<{ files: IDirState['files'] }, any> {
    public render() {
        return (
            <div className="row my-3">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">MP4</th>
                                <th scope="col">XML</th>
                            </tr>
                        </thead>
                        <FileTableTBody files={this.props.files} />
                    </table>
                </div>
            </div>
        );
    }

}

class FileTableTBody extends React.PureComponent<{ files: IDirState['files'] }, any> {
    public render() {
        const cross = 'fa fa-times text-danger';
        const check = 'fa fa-check text-success';
        const mp4_files = this.props.files.filter(x => x.filename.toUpperCase().endsWith('.MP4'));
        const xml_files = this.props.files.filter(x => x.filename.toUpperCase().endsWith('.XML'));
        return (
            <tbody>
                {mp4_files.length === 0 ?
                    <tr className="table-danger">
                        <th scope="row">None</th>
                        <td><i className={cross}></i></td>
                    </tr>
                    :
                    mp4_files.map((file, i) => {
                        const xml = getAssociatedXMLFile(file.filename, xml_files);
                        return (
                            <tr key={i} className={xml ? '' : 'table-danger'}>
                                <th scope="row">{file.filename}</th>
                                <td><i className={xml ? check : cross}></i></td>
                            </tr>
                        );
                    })}
            </tbody>
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
                    <button className={`btn btn-${this.props.directory.path ? 'sm btn-dark' : 'lg btn-light'}`}
                        onClick={this.handleClick} >
                        {this.props.directory.path ? 'Change Directory' : 'Choose Directory'}
                    </button>
                </div>
            </div>
        );
    }
}

const SecondaryDirText = () => (
    <p className="card-text">
        This is a <strong>secondary</strong> camera folder.
    </p>
);

const PrimaryDirText = () => (
    <p className="card-text">
        This is your <strong>primary</strong> camera folder.
    </p>
);
