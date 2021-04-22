import withInjectReducer from 'tool/redux/withInjectReducer';
import { useEffect, useState } from 'react';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import Room from '../containers/Room';
import { IHistory, IRoom } from '../interfaces';
import Form from '../containers/Form';
import Layout from '../containers/Layout';
import Paragraph from '../components/Paragraph';
import Div from '../components/Div';

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

      <Div id="rooms">
        {list && list.length ? (
          <>
            <Div id="list">
              {(list || []).map(({ id, name }) => (
                <Paragraph
                  key={id}
                  onClick={() => setActiveRoomId(id)}
                  className={`${id == activeRoomId ? 'active' : ''}`}
                >
                  {name}
                </Paragraph>
              ))}
            </Div>

            <Room activeId={activeRoomId} />
          </>
        ) : (
          <Paragraph>No rooms</Paragraph>
        )}
      </Div>
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
