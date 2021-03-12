import React from 'react';
import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import Dropdown from '../components/Dropdown';
import { useThemeContext } from '../contexts/Theme';
import { Link } from 'react-router-dom';

const Initial = () => {
  const { theme, changeTheme, themes } = useThemeContext();

  return (
    <div className="Initial">
      <Dropdown value={theme} values={themes} onChange={changeTheme} />
      <Link to="/logout" className={`button-logout-${theme}`}>
        <button>Log out</button>
      </Link>
      <NewToDo />
      <ToDos />
    </div>
  );
};

export default Initial;
