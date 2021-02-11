import React, { useEffect } from 'react';

import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import Dropdown from '../components/Dropdown';
import { removeCookie, setCookie } from '../cookies';
import { useThemeContext } from '../contexts/Theme';

const Initial = () => {
  const { theme, changeTheme, themes } = useThemeContext();

  useEffect(() => {
    const key = 'Initial';
    setCookie(key, 'effect');
    return () => removeCookie(key);
  }, []);

  return (
    <div className="Initial">
      <Dropdown value={theme} values={themes} onChange={changeTheme} />
      <NewToDo />
      <ToDos />
    </div>
  );
};

export default Initial;
