import React, { useCallback } from 'react';
import { useThemeContext } from '../contexts/Theme';

const ToDo = React.memo(({ item, updateItem }) => {
  const { color } = useThemeContext();

  const handleMarkDone = useCallback(() => {
    updateItem({ ...item, done: !item.done });
  }, [item, updateItem]);

  const handleRemove = useCallback(() => {
    updateItem({ ...item, removed: true });
  }, [item, updateItem]);

  return (
    <article className={`to-do-${color}`}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={item.done}
            disabled={item.removed}
            onChange={handleMarkDone}
          />
          Done
        </label>
        <button onClick={handleRemove} disabled={item.removed}>
          Remove
        </button>
      </div>
    </article>
  );
});

export default ToDo;
