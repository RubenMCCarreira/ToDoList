import React from 'react';
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

  return (
    <Layout>
      <div className={`no-wrap ${theme}`}>
        <Dropdown value={theme} values={themes} onChange={changeTheme} />
        <button onClick={onClick}>Log out</button>
      </div>
      <NewToDo />
      <ToDos />
    </Layout>
  );
};

export default Initial;
