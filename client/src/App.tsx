import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { loginMapStateToProps } from './store/login';
import { ROUTES } from './tools/pages';

const App = () => {
  const login = useSelector(loginMapStateToProps);

  if (!login || !login.saved) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/logout" component={Login} />
        {ROUTES.map(({ page, title, component }) => (
          <Route key={title} exact path={page} component={component} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
