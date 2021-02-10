import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useThemeContext } from '../contexts/Theme';
import { toDoMapDispatchToProps, toDoMapStateToProps } from '../store/toDo';

const NewToDo = React.memo(({ saveItem }) => {
  const { color } = useThemeContext();

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const handleChange = () => {
    saveItem({ title, description });
    setTitle(null);
    setDescription(null);
  };

  return (
    <form className={`new-to-do-${color}`} onSubmit={handleChange}>
      <input
        placeholder="Title"
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <input
        placeholder="Description"
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      <button onClick={handleChange}>Create</button>
    </form>
  );
});

export default connect(toDoMapStateToProps, toDoMapDispatchToProps)(NewToDo);
