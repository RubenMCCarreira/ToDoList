import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Priority from '../components/Priority';
import { useThemeContext } from '../contexts/Theme';
import { IState } from '../interfaces';

export interface IToDo {
  id: number;
  title: string;
  description: string;
  removed: boolean;
  priority: number;
  done: boolean;
}

interface ToDoProps {
  item: IToDo;
  updateItem: Function;
}

const ToDo = React.memo(({ item, updateItem, ...rest }: ToDoProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState<IState>({ value: null, error: false });
  const [description, setDescription] = useState<IState>({
    value: null,
    error: false
  });
  const [removed, setRemoved] = useState(false);
  const [priority, setPriority] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const { theme } = useThemeContext();

  useEffect(() => {
    setTitle((current) => ({ ...current, value: item.title }));
    setDescription((current) => ({ ...current, value: item.description }));
    setRemoved(item.removed);
    setPriority(item.priority);
    setDone(item.done);
  }, [item]);

  const handleMarkDone = useCallback(() => {
    updateItem({ ...item, done: !item.done });
  }, [item, updateItem]);

  const handleUpdate = useCallback(() => {
    updateItem({
      ...item,
      title: title.value,
      description: description.value,
      removed,
      priority,
      done
    });
    setShowEdit(false);
  }, [item, updateItem, title, description, removed, priority, done]);

  const handleRemove = useCallback(() => {
    updateItem({ ...item, removed: true });
  }, [item, updateItem]);

  const handleCancel = useCallback(() => {
    setTitle({ value: item.title, error: false });
    setDescription({ value: item.description, error: false });
    setShowEdit(false);
  }, [item]);

  return (
    <article className={`to-do ${theme}`} {...rest}>
      {showEdit ? (
        <>
          <div className={`no-wrap ${theme} pushes`}>
            <form className="to-do-edit">
              <Input
                item={title}
                placeholder="Title"
                onChange={(value) =>
                  setTitle((current) => ({ ...current, value }))
                }
              />
              <Input
                item={description}
                placeholder="Description"
                onChange={(value) =>
                  setDescription((current) => ({ ...current, value }))
                }
              />
            </form>
            <Priority value={priority} onChange={setPriority} />
          </div>
          <div className={`no-wrap ${theme} pushes`}>
            <Checkbox
              title="Done"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <div className={`space-between`}>
              <Button label="Cancel" onClick={handleCancel} />
              <Button label="Save" onClick={handleUpdate} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`no-wrap ${theme} pushes`}>
            <div>
              <h3>{title.value}</h3>
              <p>{description.value}</p>
            </div>
            <Priority value={priority} disabled />
          </div>
          <div className={`no-wrap ${theme} pushes`}>
            <Checkbox
              title="Done"
              checked={item.done}
              disabled={removed}
              onChange={handleMarkDone}
            />
            <div className={`space-between`}>
              <Button
                label="Edit"
                onClick={() => setShowEdit(true)}
                disabled={removed}
              />
              <Button
                label="Remove"
                onClick={handleRemove}
                disabled={removed}
              />
            </div>
          </div>
        </>
      )}
    </article>
  );
});

export default ToDo;
