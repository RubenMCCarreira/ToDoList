import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { connect } from 'react-redux';
import { themeMapStateToProps, themeMapDispatchToProps } from '../store/theme';

const ThemeContext = createContext();

const ThemeProvider = ({ children, saveItem, getItem, item }) => {
  const [color, setColor] = useState('black');
  const colors = useMemo(() => ['red', 'green'], []);

  useEffect(() => {
    if (!color) {
      getItem();
    }
  }, [getItem, color]);

  useEffect(() => {
    if (item) {
      setColor(item.color);
    }
  }, [item]);

  const changeTheme = useCallback(
    (nextColor) => {
      saveItem({ color: nextColor });
      setColor(nextColor);
    },
    [saveItem]
  );

  const value = { theme: color, changeTheme, themes: colors };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default connect(
  themeMapStateToProps,
  themeMapDispatchToProps
)(ThemeProvider);
