import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toDoMapDispatchToProps, toDoMapStateToProps } from '../store/toDo';

const NewToDo = React.memo(({ saveItem }) => {
  console.log('NewToDo');
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    saveItem({ title, description });
    setTitle(null);
    setDescription(null);
  };

  return (
    <form className="NewToDo" onSubmit={handleChange}>
      <input
        className="NewToDo-input"
        placeholder="Title"
        type="text"
        value={title || ''}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        className="NewToDo-input"
        placeholder="Description"
        type="text"
        value={description || ''}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input className="NewToDo-submit button" type="submit" />
    </form>
  );
});

export default connect(toDoMapStateToProps, toDoMapDispatchToProps)(NewToDo);
