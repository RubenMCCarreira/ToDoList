import React, { useCallback } from 'react';

const ToDo = React.memo(({ item, updateItem }) => {
  console.log('ToDo', item.id);
  const onChange = useCallback(() => {
    const nextItem = { ...item };
    nextItem.done = !nextItem.done;
    updateItem(nextItem);
  }, [item, updateItem]);

  return (
    <article className="ToDo">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="ToDo-controls">
        <label className="ToDo-done">
          <input type="checkbox" checked={item.done} onChange={onChange} /> Done
        </label>
      </div>
    </article>
  );
});

export default ToDo;
