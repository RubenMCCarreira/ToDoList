import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import Dropdown from '../components/Dropdown';
import { useThemeContext } from '../contexts/Theme';
import { IHistory } from '../interfaces';
import Layout from '../containers/Layout';

interface InitialProps {
  history: IHistory;
}

const Initial = ({ history }: InitialProps) => {
  const { theme, changeTheme, themes } = useThemeContext();

  return (
    <Layout history={history}>
      <Dropdown value={theme} values={themes} onChange={changeTheme} />
      <NewToDo />
      <ToDos />
    </Layout>
  );
};

export default Initial;
