import * as React from 'react';
import { Route, Switch } from 'react-router';
import AboutPage from './containers/AboutPage';
import App from './containers/App';
import ArboristMainPage from './containers/ArboristMainPage';
import FAQPage from './containers/FAQPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path="/about" component={AboutPage} />
      <Route path="/arborist" component={ArboristMainPage} />
      <Route path="/faq" component={FAQPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  </App>
);
