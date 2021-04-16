import { ReactChild } from 'react';
import Button from '../components/Button';
import { IHistory } from '../interfaces';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/Theme';
import Spinier from '../components/Spinier';

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
                <Link
                  to={page}
                  className={`${
                    history.location.pathname == page ? 'active' : ''
                  }`}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <Button label="Log out" onClick={onLogout} />
        </nav>
      )}
      <main>
        <div className={`no-wrap ${theme}`}>
          {!!title && <h2>{title}</h2>}
          {!!error && <h4 className="error">{error}</h4>}
        </div>
        {loading && <Spinier />}
        {children}
      </main>
    </>
  );
};

export default Layout;
