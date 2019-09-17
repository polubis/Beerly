import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import Beers from './beers/Beers';

const AppRoutes = (): ReactElement<BrowserRouter> => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/beer" component={Beers} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
 