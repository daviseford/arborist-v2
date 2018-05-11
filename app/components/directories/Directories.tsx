
import * as React from 'react';
import { Link } from 'react-router-dom';
import { updateDirectory } from '../../actions/directory_actions';
import { IDirectoriesProps } from '../../containers/DirectoriesPage';
import { IDestinationState, IDirState } from '../../definitions/state';
import BackButton from '../../ui/BackButton';
import { kRoutes, kStyles } from '../../utils/config';
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

                <Header />

                <div className="row justify-content-center">
                    {this.props.directories.map((x, i) => {
                        return <DirectoryCard updateDir={this.updateDir}
                            key={i} directory={x} camera={this.props.camera} />;
                    })}
                </div>

                <DestinationPicker dispatch={this.props.dispatch} destination={this.props.destination} />

                <div className="row justify-content-center">
                    <div className="btn-group" role="group" aria-label="button group">
                        <BackButton route={kRoutes.ROOT} />
                        <NextButton directories={this.props.directories}
                            dispatch={this.props.dispatch} destination={this.props.destination} />
                    </div>
                </div>

            </div>
        );
    }
}

class Header extends React.PureComponent {
    public render() {
        return (
            <div className="row justify-content-center mt-5">
                <div className="col-12 text-center">
                    <p className="lead">
                        Where are your files located?
                    </p>
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
    public render() {
        const checkFiles = this.props.directories.every(x => x.files && x.files.length > 0);
        const showButton = !!(checkFiles && this.props.destination.path);
        console.log(this.props.directories, showButton);
        return (
            showButton ?
                <Link className={kStyles.BTN_NEXT} to={kRoutes.COPY_LIST} >
                    Next&nbsp;&nbsp;&nbsp;<i className="fa fa-pagelines" aria-hidden="true"></i>
                </Link>
                : null
        );
    }
}
