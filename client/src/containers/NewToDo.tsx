import React from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import reducer, {
  stateToDoKey,
  toDoMapDispatchToProps,
  toDoMapStateToProps
} from '../store/toDo';
import Form from './Form';

type NewToDoProps = {
  saveItem: Function;
};

const NewToDo = React.memo(({ saveItem }: NewToDoProps) => {
  return (
    <Form
      items={[
        { prop: 'title', placeholder: 'Title', mandatory: true },
        { prop: 'description', placeholder: 'Description' }
      ]}
      onSubmit={saveItem}
    />
  );
});

export default withInjectReducer(
  stateToDoKey,
  reducer,
  toDoMapStateToProps,
  toDoMapDispatchToProps,
  NewToDo
);
