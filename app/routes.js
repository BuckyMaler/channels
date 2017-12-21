/* eslint-disable flowtype-errors/show-errors */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './components/Login';
import { requireAuth } from './services/authorization';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={Home} onEnter={requireAuth()} />
      <Route path="/login" component={Login} />
    </Switch>
  </App>
);
