import * as React from 'react';
import { Route, Switch } from 'react-router';
import AboutPage from './containers/AboutPage';
import App from './containers/App';
import CopyListPage from './containers/CopyListPage';
import DirectoriesPage from './containers/DirectoriesPage';
import FAQPage from './containers/FAQPage';
import HomePage from './containers/HomePage';
import { kRoutes } from './utils/config';

export default () => (
  <App>
    <Switch>
      <Route path={kRoutes.ABOUT} component={AboutPage} />
      <Route path={kRoutes.COPY_LIST} component={CopyListPage} />
      <Route path={kRoutes.DIRECTORIES} component={DirectoriesPage} />
      <Route path={kRoutes.FAQ} component={FAQPage} />
      <Route path={kRoutes.ROOT} component={HomePage} />

      {
        // Fallback route in case our router gets messed up
      }
      <Route path={kRoutes.WILDCARD} component={HomePage} />
    </Switch>
  </App>
);
