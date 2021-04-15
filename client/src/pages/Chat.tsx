import { useThemeContext } from '../contexts/Theme';
import Layout from '../containers/Layout';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Room from '../containers/Room';
import Spinier from '../components/Spinier';

interface IActiveRoom {
  id: number;
  name: string;
}

const Chat = ({ history, getList, list, reset, saveItem, loading, error }) => {
  const [name, setName] = useState(null);
  const [activeRoom, setActiveRoom] = useState<IActiveRoom | null>(null);
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

    saveItem({ name });

    setName(null);
  };

  return (
    <Layout>
      {loading && <Spinier />}
      <div className={`no-wrap ${theme} pushes`}>
        <h2>Chat</h2>
        {!!error && <h4 className="error">{error}</h4>}
        <div className={`no-wrap ${theme}`}>
          <Button label="Back" onClick={onBack} />
        </div>
      </div>

      <form className={`no-wrap ${theme}`} onSubmit={handleCreateRoom}>
        <Input value={name} placeholder="New room" onChange={setName} />
        <Button label="Create" type="submit" />
      </form>

      <div className={`rooms`}>
        <div className={`list ${theme}`}>
          {(list || []).map((it) => (
            <p
              key={it.id}
              onClick={() => setActiveRoom(it)}
              className={`${it.id == activeRoom?.id ? 'active' : ''}`}
            >
              {it.name}
            </p>
          ))}
        </div>

        <Room item={activeRoom} />
      </div>
    </Layout>
  );
};

export default withInjectReducer(
  stateRoomKey,
  reducer,
  roomMapStateToProps,
  roomMapDispatchToProps,
  Chat
);
