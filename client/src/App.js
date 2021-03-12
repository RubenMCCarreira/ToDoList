import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import All from './pages/All';
import Initial from './pages/Initial';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

const App = () => {
  const login = useSelector(({ login }) => login);

  if (!login || !login.saved) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Initial} />
        <Route exact path="/all" component={All} />
        <Route exact path="/logout" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
