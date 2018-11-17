import * as React from 'react';
import { Link } from 'react-router-dom';
import { clearCopyList } from '../../actions/copy_list_actions';
import { createDestinationDirs } from '../../api/FileUtil';
import { ICopyListPageProps } from '../../containers/CopyListPage';
import { ICopyList } from '../../definitions/copylist';
import { kRoutes, kStyles } from '../../utils/config';
import CopyListDisplay from './CopyListDisplay';
import {
    initializeCopyList_Sony,
    runCopyFile_Sony,
} from './helpers/sony';
import TreeGraph from './TreeGraph';

export default class CopyList extends React.Component<ICopyListPageProps, { copyListReady: boolean }> {
    constructor(pProps) {
        super(pProps);
        this.state = {
            copyListReady: false,
        };
        this.copyFiles = this.copyFiles.bind(this);
    }

    public async componentDidMount() {
        // todo update with samsung
        // tslint:disable-next-line:max-line-length
        // const initializeCopyList = this.props.camera.manufacturer === kCameraManufacturers.SONY.name ? initializeCopyList_Sony : initializeCopyList_Sony;
        await initializeCopyList_Sony(this.props.directories, this.props.destination, this.props.dispatch);
        this.setState({ copyListReady: true });
    }

    public async copyFiles() {
        // do stuff ... replicate copy file
        createDestinationDirs(this.props.copy_list, this.props.destination);
        await runCopyFile_Sony(this.props.copy_list, this.props.destination, this.props.dispatch);
    }

    public render() {
        return (
            <div className="container my-5">
                <div className="row my-4"></div>
                <div className="row align-items-center">
                    <div className="col my-auto">

                        <Header copy_list={this.props.copy_list} ready={this.state.copyListReady} />

                        <div className="row justify-content-center mb-2" hidden={!this.state.copyListReady}>
                            <div className="btn-group" role="group" aria-label="back button">
                                <BackButton copy_list={this.props.copy_list} dispatch={this.props.dispatch} />
                                <RunArboristButton copy_list={this.props.copy_list} run={this.copyFiles} />
                                <DoneButton copy_list={this.props.copy_list} />
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <CopyListDisplay copy_list={this.props.copy_list} />
                        </div>

                        <div className="row">
                            <div className="col">
                                {/* <ArcherDiagram copy_list={this.props.copy_list} /> */}
                                <TreeGraph copy_list={this.props.copy_list} />
                            </div>
                        </div>

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
                <button className={kStyles.BTN_NEXT} onClick={this.handleClick}>
                    Sort&nbsp;&nbsp;&nbsp;<i className="fa fa-magic" aria-hidden="true"></i>
                </button>
                : null
        );
    }
}

class Header extends React.PureComponent<{ copy_list: ICopyList[], ready: boolean; }, {}> {
    public render() {
        const isDone = this.props.copy_list.every(x => x.done && x.done_xml);
        const isCopying = this.props.copy_list.some(x => x.copying);
        const text = !this.props.ready ? 'Scanning your video files...'
            : isDone ? 'Nice! That was pretty easy :)'
                : isCopying ? 'This might take a minute, hold tight...'
                    : 'Click "Sort" to run Arborist!';
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-12 text-center">
                    <p className="lead">{text}</p>
                </div>
            </div>
        );
    }
}

class DoneButton extends React.PureComponent<{ copy_list: ICopyList[] }, {}> {
    public render() {
        const showButton = this.props.copy_list.every(x => x.done && x.done_xml);
        return (
            showButton ?
                <Link className={kStyles.BTN_NEXT} to={kRoutes.DONE} >
                    Done&nbsp;&nbsp;&nbsp;<i className="fa fa-chevron-right" aria-hidden="true"></i>
                </Link>
                : null
        );
    }
}

class BackButton extends React.PureComponent<{ dispatch: Function, copy_list: ICopyList[] }, {}> {
    public render() {
        return (
            <Link className={kStyles.BTN_BACK} to={kRoutes.DIRECTORIES}
                hidden={this.props.copy_list.some(x => x.copying === true)}
                onClick={() => this.props.dispatch(clearCopyList())} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Back
            </Link>
        );
    }
}
