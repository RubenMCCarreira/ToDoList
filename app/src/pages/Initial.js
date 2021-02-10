import React from 'react';

import ToDos from '../components/ToDos';
import NewToDo from '../components/NewToDo';
import Dropdown from '../components/Dropdown';

const Initial = () => {
  return (
    <div className="Initial">
      <Dropdown />
      <NewToDo />
      <ToDos />
    </div>
  );
};

export default Initial;
