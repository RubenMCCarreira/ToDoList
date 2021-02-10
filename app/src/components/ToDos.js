import React, { useEffect } from 'react';
import ToDo from './ToDo';
import { connect } from 'react-redux';
import { toDoMapStateToProps, toDoMapDispatchToProps } from '../store/toDo';
import Spinier from './Spinier';
import { useThemeContext } from '../contexts/Theme';
import { Link } from 'react-router-dom';

const ToDos = ({ all, getList, list, reset, saveItem, loading, error }) => {
  const { color } = useThemeContext();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!list) {
      getList(all);
    }
  }, [list, all]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading && <Spinier />}
      <section>
        <div className={`to-dos-header-${color}`}>
          <div>
            <h2>To Dos ({(list || []).length})</h2>
            {!!error && <h4 className="error">{error}</h4>}
          </div>
          {all ? (
            <Link to="/">
              <button>Back</button>
            </Link>
          ) : (
            <Link to="/all">
              <button>See All</button>
            </Link>
          )}
        </div>
        {(list || []).map((it) => (
          <ToDo key={it.id} item={it} updateItem={saveItem} />
        ))}
      </section>
    </>
  );
};

export default connect(toDoMapStateToProps, toDoMapDispatchToProps)(ToDos);
