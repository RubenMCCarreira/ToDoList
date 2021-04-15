import withInjectReducer from 'tool/redux/withInjectReducer';
import { useThemeContext } from '../contexts/Theme';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import Room, { IRoom } from '../containers/Room';
import Spinier from '../components/Spinier';
import { IHistory, IItemState } from '../interfaces';

interface ChatProps {
  history: IHistory;
  getList: Function;
  list: IRoom[] | null;
  reset: Function;
  saveItem: Function;
  loading: boolean | null;
  error: boolean | null;
  saved: null | number;
}

const Chat = ({
  history,
  getList,
  list,
  reset,
  saveItem,
  loading,
  error,
  saved
}: ChatProps) => {
  const [name, setName] = useState<IItemState>({ value: null, error: false });
  const [activeRoomId, setActiveRoomId] = useState<null | number>(null);
  const { theme } = useThemeContext();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (!list) {
      getList();
    }
  }, [list]);

  const onBack = () => {
    history.goBack();
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (name.value) {
      saveItem({ name: name.value });

      setName({ value: null, error: false });
    } else {
      setName((current) => ({ ...current, error: true }));
    }
  };

  useEffect(() => {
    if (saved) {
      setActiveRoomId(saved);
    }
  }, [saved]);

  return (
    <>
      <>{loading && <Spinier />}</>
      <div className={`no-wrap ${theme} pushes`}>
        <h2>Chat</h2>
        {!!error && <h4 className="error">{error}</h4>}
        <div className={`no-wrap ${theme}`}>
          <Button label="Back" onClick={onBack} />
        </div>
      </div>

      <form className={`no-wrap ${theme}`} onSubmit={handleCreateRoom}>
        <Input
          item={name}
          placeholder="New room"
          onChange={(value) => setName((current) => ({ ...current, value }))}
        />
        <Button label="Create" type="submit" />
      </form>

      {list && list.length ? (
        <div className={`rooms`}>
          <div className={`list ${theme}`}>
            {(list || []).map(({ id, name }) => (
              <p
                key={id}
                onClick={() => setActiveRoomId(id)}
                className={`${id == activeRoomId ? 'active' : ''}`}
              >
                {name}
              </p>
            ))}
          </div>

          <Room activeId={activeRoomId} />
        </div>
      ) : (
        <p>No rooms</p>
      )}
    </>
  );
};

export default withInjectReducer(
  stateRoomKey,
  reducer,
  roomMapStateToProps,
  roomMapDispatchToProps,
  Chat
);
