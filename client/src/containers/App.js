import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import All from '../pages/All';
import Initial from '../pages/Initial';
import NotFound from '../pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Initial} />
        <Route exact path="/all" component={All} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
