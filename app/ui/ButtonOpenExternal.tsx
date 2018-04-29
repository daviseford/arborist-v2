import { shell } from 'electron';
import * as React from 'react';
interface IButtonOpenExternalProps {
  btn_class?: string;
  btn_link: string;
  btn_text?: string;
}
export default class ButtonOpenExternal extends React.Component<IButtonOpenExternalProps, {}> {
  public static defaultProps = {
    btn_class: 'btn btn-md btn-default',
    btn_text: '',
  };
  public render() {
    return (
      <button className={this.props.btn_class} onClick={() => shell.openExternal(this.props.btn_link)}>
        {this.props.btn_text}
      </button>
    );
  }
}
