
import * as React from 'react';
import { Link } from 'react-router-dom';
import { kStyles } from '../utils/config';

export interface IBackButtonProps {
    route: string;
    hidden?: boolean;
}
export default class BackButton extends React.PureComponent<IBackButtonProps, {}> {
    public render() {
        return (
            <Link className={kStyles.BTN_BACK} to={this.props.route} hidden={!!this.props.hidden} >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Back
            </Link>
        );
    }
}
