import { ReactChild } from 'react';
import { useThemeContext } from '../contexts/Theme';
import { nextClassNames } from '../tools/classnames';

interface DivProps {
  children?: ReactChild | ReactChild[];
  id?: string;
  className?: string;
  noWrap?: boolean;
  pushes?: boolean;
  spaceBetween?: boolean;
}

const Div = ({
  children,
  id,
  className = '',
  noWrap,
  pushes,
  spaceBetween
}: DivProps) => {
  const { theme } = useThemeContext();

  const nextClassName = nextClassNames([
    theme,
    noWrap ? 'no-wrap' : '',
    pushes ? 'pushes' : '',
    spaceBetween ? 'space-between' : '',
    className
  ]);

  return (
    <div id={id} className={nextClassName}>
      {children}
    </div>
  );
};

export default Div;
