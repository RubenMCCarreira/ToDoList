import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import reducer, {
  themeMapStateToProps,
  themeMapDispatchToProps
} from '../store/theme';
import withReducer from '../store/withReducer';

const ThemeContext = createContext();

const ThemeProvider = ({ children, saveItem, getItem, item }) => {
  const [tryGet, setTryGet] = useState(false);
  const [color, setColor] = useState();
  const colors = useMemo(() => ['black', 'green', 'red'], []);

  useEffect(() => {
    if (!color && !tryGet) {
      getItem();
      setTryGet(true);
    } else if (!color && tryGet) {
      setColor(colors[0]);
    }
  }, [getItem, color, tryGet]);

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

export default withReducer(
  'theme',
  reducer,
  themeMapStateToProps,
  themeMapDispatchToProps,
  ThemeProvider
);
