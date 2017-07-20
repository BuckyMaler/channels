/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/app';
import Home from './containers/home';
import Login from './components/login';
import { requireAuthorization } from './services/authorization';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={Login} onEnter={requireAuthorization()} />
      <Route path="/home" component={Home} />
    </Switch>
  </App>
);
