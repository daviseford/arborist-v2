import * as React from 'react';
import { connect } from 'react-redux';
import Done from '../components/Done';
import { IApplicationState } from '../reducers';

export interface IDoneProps {
  copy_list: IApplicationState['copy_list'];
  destination: IApplicationState['destination'];
  directories: IApplicationState['directories'];
  dispatch: Function;
}

const mapStateToProps = (state: IApplicationState): Partial<IDoneProps> => {
  return {
    copy_list: state.copy_list,
    destination: state.destination,
    directories: state.directories,
  };
};

export default (connect(mapStateToProps)(Done) as any as React.StatelessComponent<IDoneProps>);
