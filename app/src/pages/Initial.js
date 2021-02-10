import React from 'react';

import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
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
