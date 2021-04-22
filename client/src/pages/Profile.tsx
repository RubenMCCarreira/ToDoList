import withInjectReducer from 'tool/redux/withInjectReducer';
import { IHistory, IProfile } from '../interfaces';
import Layout from '../containers/Layout';
import Dropdown from '../components/Dropdown';
import { useThemeContext } from '../contexts/Theme';
import Form from '../containers/Form';
import reducer, {
  loginMapDispatchToProps,
  loginMapStateToProps,
  stateLoginKey
} from '../store/login';
import { useEffect } from 'react';

interface ProfileProps {
  history: IHistory;
  item: IProfile;
  getItem: Function;
  saveItem: Function;
}

const Profile = ({ history, item, getItem, saveItem }: ProfileProps) => {
  const { theme, changeTheme, themes } = useThemeContext();

  useEffect(() => {
    if (!item) {
      getItem();
    }
  }, [item]);

  const handleSaveItem = (next) => {
    saveItem({ ...item, ...next });
  };

  return (
    <Layout history={history}>
      <Dropdown value={theme} values={themes} onChange={changeTheme} />
      <Form
        items={[
          {
            prop: 'username',
            mandatory: true,
            placeholder: 'Username'
          },
          {
            prop: 'password',
            mandatory: true,
            placeholder: 'Password',
            type: 'password'
          }
        ]}
        label="Update"
        item={item}
        onSubmit={handleSaveItem}
      />
    </Layout>
  );
};

export default withInjectReducer(
  stateLoginKey,
  reducer,
  loginMapStateToProps,
  loginMapDispatchToProps,
  Profile
);
