import { useEffect, useState } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Button from '../components/Button';
import Input from '../components/Input';
import { useThemeContext } from '../contexts/Theme';
import { IHistory, IMatch, IItemState } from '../interfaces';
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

  const [username, setUserName] = useState<IItemState>({
    value: null,
    error: false
  });
  const [password, setPassword] = useState<IItemState>({
    value: null,
    error: false
  });

  if (match && match.path === '/logout') {
    reset();
    history.push('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    saveItem({ username: username.value, password: password.value });
  };

  const withLogin = getLogin();

  useEffect(() => {
    if (!!withLogin) {
      updateItem(withLogin);
    }
  }, [!!withLogin]);

  return (
    <>
      <form className={`no-wrap ${theme}`} onSubmit={handleSubmit}>
        <Input
          item={username}
          placeholder="Username"
          onChange={(value) =>
            setUserName((current) => ({ ...current, value }))
          }
        />
        <Input
          item={password}
          placeholder="Password"
          onChange={(value) =>
            setPassword((current) => ({ ...current, value }))
          }
          type="password"
        />
        <Button label="Log In" type="submit" />
      </form>
    </>
  );
};

export default withInjectReducer(
  stateLoginKey,
  reducer,
  loginMapStateToProps,
  loginMapDispatchToProps,
  Login
);
