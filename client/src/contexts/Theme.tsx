import withInjectReducer from 'tool/redux/withInjectReducer';
import React, { createContext, useContext, useEffect, useState } from 'react';
import reducer, {
  themeMapStateToProps,
  themeMapDispatchToProps,
  stateThemeKey
} from '../store/theme';

const COLORS = ['black', 'green', 'red'];

const ThemeContext = createContext({
  theme: '',
  changeTheme: (nextColor: any) => {},
  themes: COLORS
});

const ThemeProvider = ({ children, saveItem, getItem, item }) => {
  const [tryGet, setTryGet] = useState(false);
  const [color, setColor] = useState('');

  useEffect(() => {
    if (!color && !tryGet) {
      getItem();
      setTryGet(true);
    } else if (!color && tryGet) {
      setColor(COLORS[0]);
    }
  }, [getItem, color, tryGet]);

  useEffect(() => {
    if (item) {
      setColor(item.color);
    }
  }, [item]);

  const changeTheme = (nextColor) => {
    saveItem({ color: nextColor });
    setColor(nextColor);
  };

  const value = { theme: color, changeTheme, themes: COLORS };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default withInjectReducer(
  stateThemeKey,
  reducer,
  themeMapStateToProps,
  themeMapDispatchToProps,
  ThemeProvider
);