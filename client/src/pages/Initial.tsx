import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import Dropdown from '../components/Dropdown';
import { useThemeContext } from '../contexts/Theme';
import Layout from '../containers/Layout';

const Initial = ({ history }) => {
  const { theme, changeTheme, themes } = useThemeContext();

  const onClick = () => {
    history.push('/logout');
  };

  const goChat = () => {
    history.push('/chat');
  };

  return (
    <Layout>
      <div className={`no-wrap ${theme} space-between`}>
        <Dropdown value={theme} values={themes} onChange={changeTheme} />
        <button onClick={goChat}>Chat</button>
        <button onClick={onClick}>Log out</button>
      </div>
      <NewToDo />
      <ToDos />
    </Layout>
  );
};

export default Initial;
