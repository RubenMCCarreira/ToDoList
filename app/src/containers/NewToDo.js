import React, { useState } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { useThemeContext } from '../contexts/Theme';
import { toDoMapDispatchToProps, toDoMapStateToProps } from '../store/toDo';

const NewToDo = React.memo(({ saveItem }) => {
  const { theme } = useThemeContext();

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    saveItem({ title, description });
    setTitle(null);
    setDescription(null);
  };

  return (
    <form className={`new-to-do-${theme}`} onSubmit={handleChange}>
      <Input value={title} placeholder="Title" onChange={setTitle} />
      <Input
        value={description}
        placeholder="Description"
        onChange={setDescription}
      />
      <input type="submit" />
    </form>
  );
});

export default connect(toDoMapStateToProps, toDoMapDispatchToProps)(NewToDo);
