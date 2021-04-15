import { useThemeContext } from '../contexts/Theme';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { getLogin } from '../tools/cookies';
import { useSocketContext } from '../contexts/Socket';

interface RoomProps {
  item: null | {
    id: number;
    name: string;
  };
}

interface IMessages {
  id: string;
  user: string;
  text: string;
  room: string;
}

const Room = ({ item }: RoomProps) => {
  const [message, setMessage] = useState<null | string>(null);
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
      sendMessage(message, () => console.log('sent'));
    }

    setMessage(null);
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
        <Input value={message} placeholder="Message" onChange={setMessage} />
        <button type="submit">Send</button>
      </form>
    </div>
  ) : (
    <div className={`${theme}`} />
  );
};

export default Room;
