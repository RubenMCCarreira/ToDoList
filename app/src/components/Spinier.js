import React from 'react';
import { useThemeContext } from '../contexts/Theme';

const Spinier = () => {
  const { color } = useThemeContext();

  return (
    <div className={`lds-roller-${color}`}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinier;
