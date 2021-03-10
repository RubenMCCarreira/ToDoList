import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import { useThemeContext } from '../contexts/Theme';

const ToDo = React.memo(({ item, updateItem, ...rest }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [removed, setRemoved] = useState(null);

  const { theme } = useThemeContext();

  useEffect(() => {
    setTitle(item.title);
    setDescription(item.description);
    setRemoved(item.removed);
  }, [item]);

  const handleMarkDone = useCallback(() => {
    updateItem({ ...item, done: !item.done });
  }, [item, updateItem]);

  const handleUpdate = useCallback(() => {
    updateItem({ ...item, title, description, removed });
    setShowEdit(false);
  }, [item, updateItem, title, description, removed]);

  const handleRemove = useCallback(() => {
    updateItem({ ...item, removed: true });
  }, [item, updateItem]);

  const handleCancel = useCallback(() => {
    setTitle(item.title);
    setDescription(item.description);
    setShowEdit(false);
  }, [item]);

  return (
    <article className={`to-do-${theme}`} {...rest}>
      {showEdit ? (
        <>
          <Input value={title} placeholder="Title" onChange={setTitle} />
          <Input
            value={description}
            placeholder="Description"
            onChange={setDescription}
          />
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <div>
            <Checkbox
              title="Done"
              checked={item.done}
              disabled={removed}
              onChange={handleMarkDone}
            />
            <button onClick={() => setShowEdit(true)} disabled={removed}>
              Edit
            </button>
            <button onClick={handleRemove} disabled={removed}>
              Remove
            </button>
          </div>
        </>
      )}
    </article>
  );
});

export default ToDo;
