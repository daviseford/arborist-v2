import * as path from 'path';
import * as React from 'react';
import { getMixedFilesSync, getShortDirPath, isMP4, isXML } from '../../api/FileUtil';
import { getAssociatedXMLFile_Sony_Sync } from '../../components/copylist/helpers/sony';
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
        const dir_path = this.props.directory.path;
        return (
            <div className="col-5 px-2 pt-2">
                <div className="card border-success">
                    <div className="card-header bg-success text-white">
                        {dir_path ? getShortDirPath(dir_path) : `Camera ${this.props.directory.index + 1}`}
                        &nbsp;
                        <span className="small">-&nbsp;
                        {this.props.directory.type === kDirectoryPrimary ? 'Primary' : 'Secondary'}
                        </span>
                    </div>
                    <div className="card-body text-center">
                        {this.props.directory.type === kDirectoryPrimary ? PrimaryDirText() : SecondaryDirText()}

                        {dir_path ? <FileTable files={this.props.directory.files} /> : null}

                        <ChooseDirectory updateDir={this.props.updateDir} directory={this.props.directory} />

                    </div>

                    {dir_path ?
                        <div className="card-footer bg-white text-center">
                            <h6 className="card-subtitle small mt-1">{dir_path}</h6>
                        </div>
                        : null}

                </div >
            </div >
        );
    }
}

class FileTable extends React.PureComponent<{ files: IDirState['files'] }, any> {
    public render() {
        return (
            <div className="row mt-3">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">MP4 Files</th>
                                <th scope="col">Has XML</th>
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
        const mp4_files = this.props.files.filter(x => isMP4(x.filename));
        const xml_files = this.props.files.filter(x => isXML(x.filename));
        return (
            <tbody>
                {mp4_files.length === 0 ?
                    <tr className="table-danger">
                        <th scope="row">None</th>
                        <td><i className={cross}></i></td>
                    </tr>
                    :
                    mp4_files.map((file, i) => {
                        const xml = getAssociatedXMLFile_Sony_Sync(file.filename, xml_files);
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
        const btnColor = this.props.directory.path ? 'btn-outline-dark' : 'btn-outline-success';
        return (
            <div className="row justify-content-center">
                <div className="col text-center">
                    <button className={`btn btn-md ${btnColor}`}
                        onClick={this.handleClick} >
                        {this.props.directory.path ? 'Change Folder' : 'Choose Folder'}
                    </button>
                </div>
            </div>
        );
    }
}

const SecondaryDirText = () => (
    <p className="card-text">
        This is a <strong>secondary</strong> camera.
    </p>
);

const PrimaryDirText = () => (
    <p className="card-text">
        This is your <strong>primary</strong> camera.
    </p>
);
