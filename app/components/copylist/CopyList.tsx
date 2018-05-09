
import * as React from 'react';
import { Link } from 'react-router-dom';
import { batchUpdateCopyList } from '../../actions/copy_list_actions';
import { ICopyListPageProps } from '../../containers/CopyListPage';
import { ICopyList } from '../../definitions/copylist';
import { IBasicSorterEntry } from '../../definitions/sony_xml';
import { kRoutes } from '../../utils/config';
import CopyListDisplay from './CopyListDisplay';
import {
    createDestinationDirs,
    getBasicSorterEntries_Sony,
    parseBasicSorterEntries,
    processUpdatedXMLArray,
    runCopyFile,
} from './helpers/sony';

export default class CopyList extends React.Component<ICopyListPageProps, {}> {
    constructor(pProps) {
        super(pProps);
        this.initializeCopyList = this.initializeCopyList.bind(this);
        this.copyFiles = this.copyFiles.bind(this);
    }

    public componentDidMount() {
        this.initializeCopyList();
    }

    // todo make async throughout
    public initializeCopyList() {
        const basicSorterEntries = this.props.directories.reduce((accum: IBasicSorterEntry[], dir) => {
            const entries = getBasicSorterEntries_Sony(dir);
            entries.forEach(e => accum.push(e));
            return accum;
        }, []);
        const sorterEntries = parseBasicSorterEntries(basicSorterEntries);
        // At this point, we've got the XML objects for the copy list
        // push them out to state/copylist
        const copy_list = processUpdatedXMLArray(sorterEntries, this.props.directories, this.props.destination);
        console.log('copy_list', copy_list);
        this.props.dispatch(batchUpdateCopyList(copy_list));
    }

    public async copyFiles() {
        // do stuff ... replicate copy file
        createDestinationDirs(this.props.copy_list, this.props.destination);
        await runCopyFile(this.props.copy_list, this.props.destination, this.props.dispatch);
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
                        <BackButton />
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
                <Link className="btn btn-success" to={kRoutes.ROOT} >
                    Done <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </Link>
                : null
        );
    }
}

class BackButton extends React.PureComponent {
    public render() {
        return (
            <Link className="btn btn-light" to={kRoutes.DIRECTORIES} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>  Back
            </Link>
        );
    }
}
