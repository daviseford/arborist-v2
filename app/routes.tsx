import * as React from 'react';
import { Route, Switch } from 'react-router';
import AboutPage from './containers/AboutPage';
import App from './containers/App';
import ArboristMainPage from './containers/ArboristMainPage';
import FAQPage from './containers/FAQPage';
import HomePage from './containers/HomePage';
import { kRoutes } from './utils/config';

export default () => (
  <App>
    <Switch>
      <Route path={kRoutes.ABOUT} component={AboutPage} />
      <Route path={kRoutes.ARBORIST}component={ArboristMainPage} />
      <Route path={kRoutes.FAQ} component={FAQPage} />
      <Route path={kRoutes.ROOT} component={HomePage} />

      {
        // Fallback route in case our router gets messed up
      }
      <Route path="*" component={HomePage} />
    </Switch>
  </App>
);
