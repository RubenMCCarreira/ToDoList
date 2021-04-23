import React, { useCallback, useEffect, useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import H3 from '../components/H3';
import Paragraph from '../components/Paragraph';
import Priority from '../components/Priority';
import { IItemState, IToDo } from '../interfaces';
import Article from '../components/Article';
import Div from '../components/Div';

interface ToDoProps {
  item: IToDo;
  updateItem: Function;
}

const ToDo = React.memo(({ item, updateItem, ...rest }: ToDoProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState<IItemState>({ value: null, error: false });
  const [description, setDescription] = useState<IItemState>({
    value: null,
    error: false
  });
  const [removed, setRemoved] = useState(false);
  const [priority, setPriority] = useState<number | null>(null);
  const [done, setDone] = useState(false);

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
    <Article id={`to-do`} {...rest}>
      {showEdit ? (
        <>
          <Div noWrap pushes>
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
          </Div>
          <Div noWrap pushes>
            <Checkbox
              title="Done"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <Div spaceBetween>
              <Button label="Cancel" onClick={handleCancel} />
              <Button label="Save" onClick={handleUpdate} />
            </Div>
          </Div>
        </>
      ) : (
        <>
          <Div noWrap pushes>
            <Div>
              <H3>{title.value}</H3>
              <Paragraph>{description.value}</Paragraph>
            </Div>
            <Priority value={priority} disabled />
          </Div>
          <Div noWrap pushes>
            <Checkbox
              title="Done"
              checked={item.done}
              disabled={removed}
              onChange={handleMarkDone}
            />
            <Div spaceBetween>
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
            </Div>
          </Div>
        </>
      )}
    </Article>
  );
});

export default ToDo;
