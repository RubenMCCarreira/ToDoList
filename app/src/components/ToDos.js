import React, { useEffect } from 'react';
import ToDo from './ToDo';
import { connect } from 'react-redux';
import { toDoMapStateToProps, toDoMapDispatchToProps } from '../store/toDo';
import Spinier from './Spinier';

const ToDos = ({ getList, list, reset, saveItem, loading, error }) => {
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
    <>
      <Spinier />
      <section>
        <h2>To Dos ({(list || []).length})</h2>
        {!!error && <h4 className="error">{error}</h4>}
        {(list || []).map((it) => (
          <ToDo key={it.id} item={it} updateItem={saveItem} />
        ))}
      </section>
    </>
  );
};

export default connect(toDoMapStateToProps, toDoMapDispatchToProps)(ToDos);
