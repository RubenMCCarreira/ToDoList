import React, { createContext, useContext, useMemo, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState('red');
  const colors = useMemo(() => ['red', 'green'], []);

  const value = { color, setColor, colors };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
