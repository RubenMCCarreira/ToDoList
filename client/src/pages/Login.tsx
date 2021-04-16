import { useEffect } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Form from '../containers/Form';
import Layout from '../containers/Layout';
import { IHistory, IMatch } from '../interfaces';
import reducer, {
  loginMapDispatchToProps,
  loginMapStateToProps,
  stateLoginKey
} from '../store/login';
import { getLogin } from '../tools/cookies';

interface LoginProps {
  saveItem: Function;
  updateItem: Function;
  reset: Function;
  history: IHistory;
  match: IMatch;
}

const Login = ({ saveItem, updateItem, reset, history, match }: LoginProps) => {
  if (match && match.path === '/logout') {
    reset();
    history.push('/');
  }

  const withLogin = getLogin();

  useEffect(() => {
    if (!!withLogin) {
      updateItem(withLogin);
    }
  }, [!!withLogin]);

  return (
    <Layout title="Login">
      <Form
        items={[
          { prop: 'username', placeholder: 'Username', mandatory: true },
          { prop: 'password', placeholder: 'Password', mandatory: true }
        ]}
        onSubmit={saveItem}
        label="Log In"
      />
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
