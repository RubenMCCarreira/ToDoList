import React from 'react';

import ToDos from './components/ToDos';
import NewToDo from './components/NewToDo';

const Application = () => {
  return (
    <div className="Application">
      <NewToDo />
      <ToDos />
    </div>
  );
};

export default Application;
