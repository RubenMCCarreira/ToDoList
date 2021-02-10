import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AllToDos from './pages/AllToDos';
import Initial from './pages/Initial';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Initial} />
        <Route exact path="/all" component={AllToDos} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
