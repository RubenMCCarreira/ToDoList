import withInjectReducer from 'tool/redux/withInjectReducer';
import React, { useState } from 'react';
import Input from '../components/Input';
import { useThemeContext } from '../contexts/Theme';
import reducer, {
  stateToDoKey,
  toDoMapDispatchToProps,
  toDoMapStateToProps
} from '../store/toDo';

type NewToDoProps = {
  saveItem: Function;
};

const NewToDo = React.memo(({ saveItem }: NewToDoProps) => {
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
    <form className={`no-wrap ${theme}`} onSubmit={handleChange}>
      <Input value={title} placeholder="Title" onChange={setTitle} />
      <Input
        value={description}
        placeholder="Description"
        onChange={setDescription}
      />
      <button type="submit">Submit</button>
    </form>
  );
});

export default withInjectReducer(
  stateToDoKey,
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  NewToDo
);
