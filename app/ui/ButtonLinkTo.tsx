import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  btn_class?: string;
  to: string;
  btn_text: string;
}

export default class ButtonLinkTo extends React.Component<IProps> {
  public static defaultProps = {
    btn_class: 'btn btn-md btn-default',
    btn_text: '',
  };

  public render() {
    return (
      <Link className={this.props.btn_class} to={this.props.to}>
        {this.props.btn_text}
      </Link>
    );
  }
}
