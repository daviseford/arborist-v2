import React, {Component} from "react";
import {shell} from "electron";

export default class ButtonOpenExternal extends Component {

  static propTypes = {
    btn_class: React.PropTypes.string,
    btn_link: React.PropTypes.string.isRequired,
    btn_text: React.PropTypes.string,
  };

  static defaultProps = {
    btn_class: 'btn btn-md btn-default',
    btn_text: '',
  };

  render() {
    return (
        <button className={this.props.btn_class} onClick={()=>shell.openExternal(this.props.btn_link)}>
          {this.props.btn_text}
        </button>
    )
  }
}