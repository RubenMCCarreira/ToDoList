import { useEffect, useState } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Input from '../components/Input';
import Layout from '../containers/Layout';
import { useThemeContext } from '../contexts/Theme';
import { IHistory, IMatch } from '../interfaces';
import reducer, {
  loginMapDispatchToProps,
  loginMapStateToProps,
  stateLoginKey
} from '../store/login';
import { getLogin } from '../tools/cookies';

interface ILogin {
  saveItem: Function;
  updateItem: Function;
  reset: Function;
  history: IHistory;
  match: IMatch;
}

const Login = ({ saveItem, updateItem, reset, history, match }: ILogin) => {
  const { theme } = useThemeContext();

  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  if (match && match.path === '/logout') {
    reset();
    history.push('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem({ username, password });
  };

  const withLogin = getLogin();

  useEffect(() => {
    if (!!withLogin) {
      updateItem(withLogin);
    }
  }, [!!withLogin]);

  return (
    <Layout>
      <form className={`no-wrap ${theme}`} onSubmit={handleSubmit}>
        <Input value={username} placeholder="Username" onChange={setUserName} />
        <Input
          value={password}
          placeholder="Password"
          onChange={setPassword}
          type="password"
        />
        <button type="submit">Log In</button>
      </form>
    </Layout>
  );
};

export default withInjectReducer(
  stateLoginKey,
  reducer,
  loginMapStateToProps,
  loginMapDispatchToProps,
  Login
);
