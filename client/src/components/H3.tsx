import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';

interface H3Props {
  children: string | null | ReactChild | ReactChild[];
}

const H3 = ({ children }: H3Props) => {
  const { theme } = useThemeContext();

  return <h3 className={`${theme}`}>{children}</h3>;
};

export default H3;
