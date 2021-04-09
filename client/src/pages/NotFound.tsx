import { Link } from 'react-router-dom';
import Layout from '../containers/Layout';
import { useThemeContext } from '../contexts/Theme';

const NotFound = () => {
  const { theme } = useThemeContext();

  return (
    <Layout>
      <h2>Not Found</h2>
      <Link to="/" className={`button-home-${theme}`}>
        <button>Home</button>
      </Link>
    </Layout>
  );
};

export default NotFound;
