import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Initial from './pages/Initial';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { loginMapStateToProps } from './store/login';
import Map from './pages/Map';

const App = () => {
  const login = useSelector(loginMapStateToProps);

  if (!login || !login.saved) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Initial} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/map" component={Map} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
