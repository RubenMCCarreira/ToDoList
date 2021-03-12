import React, { useEffect, useState } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Input from '../components/Input';
import reducer, {
  loginMapDispatchToProps,
  loginMapStateToProps,
  stateLoginKey
} from '../store/login';
import { getLogin } from '../tools/cookies';

const Login = ({ saveItem, updateItem, reset, history, match }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

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
    <form onSubmit={handleSubmit}>
      <Input value={username} placeholder="username" onChange={setUserName} />
      <Input
        value={password}
        placeholder="Password"
        onChange={setPassword}
        type="password"
      />
      <input type="submit" />
    </form>
  );
};

export default withInjectReducer(
  stateLoginKey,
  reducer,
  loginMapStateToProps,
  loginMapDispatchToProps,
  Login
);
