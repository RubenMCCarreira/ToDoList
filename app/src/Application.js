import React from 'react';

import ToDos from './ToDos';
import NewToDo from './NewToDo';

const Application = () => {
  return (
    <div className="Application">
      <NewToDo />
      <ToDos />
    </div>
  );
};

export default Application;
