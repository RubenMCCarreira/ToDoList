import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface ParagraphProps {
  children: string | null | ReactChild | ReactChild[];
  className?: string;
  onClick?: Function;
}

const Paragraph = ({ children, className = '', onClick }: ParagraphProps) => {
  const { theme } = useThemeContext();

  const handleChange = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <p onClick={handleChange} className={nextClassNames([theme, className])}>
      {children}
    </p>
  );
};

export default Paragraph;
