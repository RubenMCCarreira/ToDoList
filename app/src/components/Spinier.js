import React from 'react';
import { useThemeContext } from '../contexts/Theme';

const Spinier = () => {
  const { color } = useThemeContext();

  return (
    <div className={`spinier-${color}`}>
      <div className={`lds-ellipsis`}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Spinier;
