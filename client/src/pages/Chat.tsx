import withInjectReducer from 'tool/redux/withInjectReducer';
import { useThemeContext } from '../contexts/Theme';
import { useEffect, useState } from 'react';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import Room, { IRoom } from '../containers/Room';
import { IHistory } from '../interfaces';
import Form from '../containers/Form';
import Layout from '../containers/Layout';

interface ChatProps {
  history: IHistory;
  getList: Function;
  list: IRoom[] | null;
  reset: Function;
  saveItem: Function;
  loading: boolean | null;
  error: string | null;
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

  useEffect(() => {
    if (saved) {
      setActiveRoomId(saved);
    }
  }, [saved]);

  return (
    <Layout history={history} title="Chat" loading={loading} error={error}>
      <Form
        items={[{ prop: 'name', placeholder: 'New room', mandatory: true }]}
        onSubmit={saveItem}
        label="Create"
      />

      <div className={`rooms ${theme}`}>
        {list && list.length ? (
          <>
            <div className={`list`}>
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
          </>
        ) : (
          <p>No rooms</p>
        )}
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
