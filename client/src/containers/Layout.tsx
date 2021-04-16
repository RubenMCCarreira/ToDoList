import { ReactChild } from 'react';
import Button from '../components/Button';
import { IHistory } from '../interfaces';
import { useThemeContext } from '../contexts/Theme';
import Spinier from '../components/Spinier';
import H2 from '../components/H2';
import H4 from '../components/H4';
import MyLink from '../components/MyLink';
import Div from '../components/Div';

interface LayoutProps {
  children: ReactChild | ReactChild[];
  title?: string;
  history?: IHistory;
  loading?: boolean | null;
  error?: string | null;
}

const LINKS = [
  {
    page: '/',
    title: 'To Dos'
  },
  {
    page: '/chat',
    title: 'Chat'
  },
  {
    page: '/map',
    title: 'Map'
  }
];

const Layout = ({ children, title, history, loading, error }: LayoutProps) => {
  const { theme } = useThemeContext();

  const onLogout = () => {
    if (history) {
      history.push('/logout');
    }
  };

  const onBack = () => {
    if (history) {
      history.goBack();
    }
  };

  return (
    <>
      {!!history && (
        <nav className={theme}>
          <Button label="Back" onClick={onBack} />
          <ul>
            {LINKS.map(({ page, title }) => (
              <li key={page}>
                <MyLink
                  to={page}
                  className={`${
                    history.location.pathname == page ? 'active' : ''
                  }`}
                >
                  {title}
                </MyLink>
              </li>
            ))}
          </ul>
          <Button label="Log out" onClick={onLogout} />
        </nav>
      )}
      <main>
        {(!!title || !!error) && (
          <Div noWrap>
            <>
              {!!title && <H2>{title}</H2>}
              {!!error && <H4 className="error">{error}</H4>}
            </>
          </Div>
        )}
        {loading && <Spinier />}
        {children}
      </main>
    </>
  );
};

export default Layout;
