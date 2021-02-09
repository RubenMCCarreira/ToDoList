import React from 'react';

import ToDos from './components/ToDos';
import NewToDo from './components/NewToDo';
import Dropdown from './components/Dropdown';

const Application = () => {
  return (
    <div className="Application">
      <Dropdown />
      <NewToDo />
      <ToDos />
    </div>
  );
};

export default Application;
