import React, { useEffect } from 'react';
import ToDo from './ToDo';
import { connect } from 'react-redux';
import { toDoMapStateToProps, toDoMapDispatchToProps } from './store/toDo';

const ToDos = ({ getList, list, reset, saveItem }) => {
  useEffect(() => {
    return () => {
      reset();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [list]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="ToDos">
      <h2>To Dos ({(list || []).length})</h2>
      {(list || []).map((toDo) => (
        <ToDo key={toDo.id} item={toDo} updateItem={saveItem} />
      ))}
    </section>
  );
};

export default connect(toDoMapStateToProps, toDoMapDispatchToProps)(ToDos);
