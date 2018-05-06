
import * as React from 'react';
import { Link } from 'react-router-dom';
import { updateDirectory } from '../../actions/directory_actions';
import { IDirectoriesProps } from '../../containers/DirectoriesPage';
import { IDestinationState, IDirState } from '../../definitions/state';
import { kRoutes } from '../../utils/config';
import DestinationPicker from './DestinationPicker';
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
                            key={i} directory={x} camera={this.props.camera} />;
                    })}
                </div>

                <DestinationPicker dispatch={this.props.dispatch} destination={this.props.destination} />

                <div className="row justify-content-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <BackButton />
                        <NextButton directories={this.props.directories}
                        dispatch={this.props.dispatch} destination={this.props.destination}/>
                    </div>
                </div>

            </div>
        );
    }
}

interface INextButtonProps {
    directories: IDirState[];
    destination: IDestinationState;
    dispatch: Function;
}

class NextButton extends React.PureComponent<INextButtonProps, {}> {

    constructor(pProps) {
        super(pProps);
        this.runSorter = this.runSorter.bind(this);
    }

    // Send to XML Sorter
    public runSorter(e) {
        e.preventDefault();
        // const a = new XMLSorterNew(this.props.directories, this.props.dispatch, true);
        // a.process();

    }

    public render() {
        const checkFiles = this.props.directories.every(x => x.files && x.files.length > 0);
        const showButton = checkFiles && this.props.destination.path;
        console.log(this.props.directories, showButton);
        return (
            showButton ?
                <Link className="btn btn-success m-2" to={kRoutes.ARBORIST} onClick={this.runSorter} >
                    Next <i className="fa fa-pagelines" aria-hidden="true"></i>
                </Link>
                : null
        );
    }
}

class BackButton extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <Link className="btn btn-light m-2" to={kRoutes.ROOT} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>  Back
            </Link>
        );
    }
}
