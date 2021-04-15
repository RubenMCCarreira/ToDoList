import { useThemeContext } from '../contexts/Theme';
import Layout from '../containers/Layout';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import withInjectReducer from 'tool/redux/withInjectReducer';
import Room from '../containers/Room';

interface IActiveRoom {
  id: number;
  name: string;
}

const Chat = ({ history, getList, list, reset, saveItem }) => {
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
      <div className={`no-wrap ${theme}`}>
        <button onClick={onBack}>Back</button>
      </div>

      <form className={`no-wrap ${theme}`} onSubmit={handleCreateRoom}>
        <Input value={name} placeholder="New room" onChange={setName} />
        <button type="submit">Create</button>
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
