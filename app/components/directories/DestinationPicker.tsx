import * as React from 'react';
import { addDestination } from '../../actions/destination_actions';
import { IDestinationState } from '../../definitions/state';
const { dialog } = require('electron').remote;

interface IDestinationPickerProps {
    destination: IDestinationState;
    dispatch: Function;
}

export default class DestinationPicker extends React.PureComponent<IDestinationPickerProps, any> {
    constructor(pProps) {
        super(pProps);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(e) {
        e.preventDefault();
        const fileSelect = dialog.showOpenDialog({ properties: ['openDirectory'] });
        if (fileSelect && !!fileSelect[0]) {
            this.props.dispatch(addDestination(fileSelect[0]));
        }
    }
    public render() {
        return (
            <div className="row justify-content-center my-3">
                <div className="col-12 text-center">
                    <button className={`btn btn-${this.props.destination.path ? 'sm btn-dark' : 'lg btn-light'}`}
                        onClick={this.handleClick} >
                        {`${this.props.destination.path ? 'Change' : 'Choose'} Destination Folder`}
                    </button>
                </div>
                {this.props.destination.path ?
                    <div className="col-12 text-center mt-1">
                        <small>
                            Your files will be saved in this directory: <br />
                            {this.props.destination.path}
                        </small>
                    </div>
                    : null
                }
            </div>
        );
    }
}
