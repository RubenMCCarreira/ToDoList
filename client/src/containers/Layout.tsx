import { ReactChild } from 'react';

interface ILayout {
  children: ReactChild | ReactChild[];
}

const Layout = ({ children }: ILayout) => {
  return <main>{children}</main>;
};

export default Layout;
