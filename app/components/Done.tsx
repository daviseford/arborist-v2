import { shell } from 'electron';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { clearCopyList } from '../actions/copy_list_actions';
import { IDoneProps } from '../containers/DonePage';
import { kRoutes } from '../utils/config';

export default class Done extends React.Component<IDoneProps, any> {
    constructor(pProps) {
        super(pProps);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e) {
        e.preventDefault();
        shell.showItemInFolder(this.props.destination.path);
    }

    public render() {
        return (
            <div className="container">
                <div className="row justify-content-center text-center mt-5 pt-5">

                    <div className="col">

                        <h1 className="cover-heading">Thanks :)</h1>
                        <p className="lead">We're all done here. Your files have been sorted!</p>
                        <p className="lead">
                            <ShowButton handleClick={this.handleClick} />
                        </p>
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
            <button className="btn btn-lg btn-secondary" onClick={this.props.handleClick}>
                Take me to my files!
            </button>
        );
    }
}

class NextButton extends React.PureComponent<{ dispatch: Function }, {}> {
    public render() {
        return (
            <Link className="btn btn-success m-2" to={kRoutes.ROOT}
                onClick={() => this.props.dispatch(clearCopyList())} >
                Start Over <i className="fa fa-pagelines" aria-hidden="true"></i>
            </Link>
        );
    }
}
