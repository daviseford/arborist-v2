import * as React from 'react';
import { Link } from 'react-router-dom';
import { clearCopyList } from '../../actions/copy_list_actions';
import { createDestinationDirs } from '../../api/FileUtil';
import { ICopyListPageProps } from '../../containers/CopyListPage';
import { ICopyList } from '../../definitions/copylist';
import { kRoutes } from '../../utils/config';
import CopyListDisplay from './CopyListDisplay';
import {
    initializeCopyList_Sony,
    runCopyFile_Sony,
} from './helpers/sony';

export default class CopyList extends React.Component<ICopyListPageProps, {}> {
    constructor(pProps) {
        super(pProps);
        this.copyFiles = this.copyFiles.bind(this);
    }

    public componentDidMount() {
        // todo update with samsung
        // tslint:disable-next-line:max-line-length
        // const initializeCopyList = this.props.camera.manufacturer === kCameraManufacturers.SONY.name ? initializeCopyList_Sony : initializeCopyList_Sony;
        initializeCopyList_Sony(this.props.directories, this.props.destination, this.props.dispatch);
    }

    public async copyFiles() {
        // do stuff ... replicate copy file
        createDestinationDirs(this.props.copy_list, this.props.destination);
        await runCopyFile_Sony(this.props.copy_list, this.props.destination, this.props.dispatch);
    }

    public render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <CopyListDisplay copy_list={this.props.copy_list} />
                </div>

                <div className="row justify-content-center">
                    <div className="btn-group" role="group" aria-label="back button">
                        <BackButton copy_list={this.props.copy_list} dispatch={this.props.dispatch} />
                        <RunArboristButton copy_list={this.props.copy_list} run={this.copyFiles} />
                        <DoneButton copy_list={this.props.copy_list} />
                    </div>
                </div>

            </div>
        );
    }
}

interface IRunArboristButtonProps {
    copy_list: ICopyList[];
    run: Function;
}

class RunArboristButton extends React.PureComponent<IRunArboristButtonProps, {}> {
    constructor(pProps) {
        super(pProps);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e) {
        e.preventDefault();
        this.props.run();
    }

    public render() {
        const isDone = this.props.copy_list.every(x => x.done && x.done_xml);
        const showButton = !isDone && this.props.copy_list.every(x => x.copying === false);
        return (
            showButton ?
                <button className="btn btn-info" onClick={this.handleClick}>
                    Sort   <i className="fa fa-magic" aria-hidden="true"></i>
                </button>
                : null
        );
    }
}

class DoneButton extends React.PureComponent<{ copy_list: ICopyList[] }, {}> {
    public render() {
        const showButton = this.props.copy_list.every(x => x.done && x.done_xml);
        return (
            showButton ?
                <Link className="btn btn-success" to={kRoutes.DONE} >
                    Done <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </Link>
                : null
        );
    }
}

class BackButton extends React.PureComponent<{ dispatch: Function, copy_list: ICopyList[] }, {}> {
    public render() {
        return (
            <Link className="btn btn-light" to={kRoutes.DIRECTORIES}
                hidden={this.props.copy_list.some(x => x.copying === true)}
                onClick={() => this.props.dispatch(clearCopyList())} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>  Back
            </Link>
        );
    }
}
