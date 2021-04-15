import withInjectReducer from 'tool/redux/withInjectReducer';
import React, { useState } from 'react';
import Input from '../components/Input';
import { useThemeContext } from '../contexts/Theme';
import reducer, {
  stateToDoKey,
  toDoMapDispatchToProps,
  toDoMapStateToProps
} from '../store/toDo';
import Button from '../components/Button';

type NewToDoProps = {
  saveItem: Function;
};

const NewToDo = React.memo(({ saveItem }: NewToDoProps) => {
  const { theme } = useThemeContext();

  const [title, setTitle] = useState({ value: null, error: false });
  const [description, setDescription] = useState({ value: null, error: false });

  const handleChange = (e) => {
    e.preventDefault();

    if (title) {
      saveItem({ title: title.value, description: description.value });
    }

    setTitle({ value: null, error: false });
    setDescription({ value: null, error: false });
  };

  return (
    <form className={`no-wrap ${theme}`} onSubmit={handleChange}>
      <Input
        item={title}
        placeholder="Title"
        onChange={(value) => setTitle((current) => ({ ...current, value }))}
      />
      <Input
        item={description}
        placeholder="Description"
        onChange={(value) =>
          setDescription((current) => ({ ...current, value }))
        }
      />
      <Button label="Submit" type="submit" />
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
