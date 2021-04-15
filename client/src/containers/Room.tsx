import { useThemeContext } from '../contexts/Theme';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { getLogin } from '../tools/cookies';
import { useSocketContext } from '../contexts/Socket';
import Button from '../components/Button';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import withInjectReducer from 'tool/redux/withInjectReducer';

export interface IRoom {
  id: number;
  name: string;
}

interface RoomProps {
  activeId: null | number;
  item: null | IRoom;
  getItem: Function;
}

interface IMessages {
  id: string;
  user: string;
  text: string;
  room: string;
}

const Room = ({ activeId, item, getItem }: RoomProps) => {
  const [message, setMessage] = useState({ value: null, error: false });
  const [messages, setMessages] = useState<IMessages[]>([]);
  const { theme } = useThemeContext();
  const {
    socket,
    connect,
    disconnect,
    onJoin,
    onMessage,
    onWelcome,
    onRoomData,
    sendMessage
  } = useSocketContext();

  useEffect(() => {
    if (activeId && (!item || activeId != item.id)) {
      getItem(activeId);
    }
  }, [activeId, item]);

  useEffect(() => {
    if (item) {
      setMessages([]);
      connect();
    }

    return () => {
      if (item) {
        disconnect();
        setMessages([]);
      }
    };
  }, [connect, disconnect, item]);

  useEffect(() => {
    if (socket && item) {
      onJoin(getLogin()?.username, item.name, (error) => {
        if (error) {
          console.log(error);
        }
      });
      onMessage((data) => {
        setMessages((messages) => [...messages, data]);
      });
      onWelcome((data) => {
        setMessages((messages) => [...messages, data]);
      });
      onRoomData(({ users, messages: newMessages }) => {
        setMessages((messages) => [...messages, ...newMessages]);
      });
    }
  }, [socket, item]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (socket) {
      sendMessage(message.value, () => console.log('sent'));
    }

    setMessage({ value: null, error: false });
  };

  return item ? (
    <div className={`${theme}`}>
      <div className={`messages ${theme}`}>
        {messages.map(({ id, user, text }) => (
          <p
            key={id}
            className={`${user == getLogin().username ? 'my-self' : ''}`}
          >
            <span>{user}:</span> {text}
          </p>
        ))}
      </div>

      <form className={`no-wrap ${theme}`} onSubmit={handleSendMessage}>
        <Input
          item={message}
          placeholder="Message"
          onChange={(value) => setMessage((current) => ({ ...current, value }))}
        />
        <Button label="Send" type="submit" />
      </form>
    </div>
  ) : (
    <div className={`${theme}`} />
  );
};

export default withInjectReducer(
  stateRoomKey,
  reducer,
  roomMapStateToProps,
  roomMapDispatchToProps,
  Room
);
