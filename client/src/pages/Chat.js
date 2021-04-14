import { useThemeContext } from '../contexts/Theme';
import Layout from '../containers/Layout';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { getLogin } from '../tools/cookies';
import { useSocketContext } from '../contexts/Socket';

const Chat = ({ history }) => {
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const { theme } = useThemeContext();
  const {
    socket,
    connect,
    disconnect,
    onMessage,
    onWelcome,
    onRoomData,
    sendMessage
  } = useSocketContext();

  const onBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setMessages([]);
    connect();

    return () => {
      disconnect();
      setMessages([]);
    };
  }, [connect, disconnect]);

  useEffect(() => {
    if (socket) {
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
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (socket) {
      sendMessage(message, () => console.log('sent'));
    }

    setMessage(null);
  };

  return (
    <Layout>
      <div className={`no-wrap ${theme}`}>
        <button onClick={onBack}>Back</button>
      </div>

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
    </Layout>
  );
};

export default Chat;
