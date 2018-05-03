import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Home from '../components/HomeNew';

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  public render() {
    return (
      <Home />
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
