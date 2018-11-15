import { shell } from 'electron';
import * as path from 'path';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { clearCopyList } from '../actions/copy_list_actions';
import { getSceneDirName } from '../api/FileUtil';
import { IDoneProps } from '../containers/DonePage';
import { kOutputDirectory, kRoutes, kStyles } from '../utils/config';

export default class Done extends React.Component<IDoneProps, any> {
    constructor(pProps) {
        super(pProps);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e) {
        e.preventDefault();
        shell.showItemInFolder(path.join(this.props.destination.path, kOutputDirectory, getSceneDirName(1)));
    }

    public render() {
        return (
            <div className="container">
                <div className="row my-5"></div>
                <div className="row my-5"></div>
                <div className="row my-5"></div>
                <div className="row align-items-center justify-items-center text-center my-5">
                    <div className="col my-auto">

                            <h1 className="cover-heading">Thanks :)</h1>
                            <p className="lead">We're all done here. Your files have been sorted.</p>
                            <p className="lead">
                                <ShowButton handleClick={this.handleClick} />
                            </p>
                            <p>or</p>
                            <p className="lead text-center">
                                <NextButton dispatch={this.props.dispatch} />
                            </p>

                    </div>
                </div>
            </div>
        );
    }
}

class ShowButton extends React.PureComponent<{ handleClick: (e: any) => void }, {}> {
    public render() {
        return (
            <button className={kStyles.BTN_BACK} onClick={this.props.handleClick}>
                Take me to my files!
            </button>
        );
    }
}

class NextButton extends React.PureComponent<{ dispatch: Function }, {}> {
    public render() {
        return (
            <Link className={kStyles.BTN_NEXT} to={kRoutes.ROOT}
                onClick={() => this.props.dispatch(clearCopyList())} >
                Start Over&nbsp;&nbsp;&nbsp;<i className="fa fa-pagelines" aria-hidden="true"></i>
            </Link>
        );
    }
}
