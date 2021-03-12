import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/Theme';

const NotFound = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <h2>Not Found</h2>
      <Link to="/" className={`button-home-${theme}`}>
        <button>Home</button>
      </Link>
    </>
  );
};

export default NotFound;
