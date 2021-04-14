import { useThemeContext } from '../contexts/Theme';
import Layout from '../containers/Layout';
import socketClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { getLogin } from '../tools/cookies';

const Chat = ({ history }) => {
  const { theme } = useThemeContext();
  const [socket, setSocket] = useState(null);

  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const onBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setSocket(
      socketClient('http://localhost:5000/', {
        transports: ['websocket']
      })
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
      });
      socket.on('message', (data) => {
        console.log(111, data);
        setMessages((messages) => [...messages, data]);
      });
      socket.on('welcome', (data) => {
        console.log(122.5, data);
        setMessages((messages) => [...messages, data]);
      });
      socket.on('roomData', ({ users, messages: newMessages }) => {
        console.log(222, users, newMessages);
        setMessages((messages) => [...messages, ...newMessages]);
      });
      socket.emit(
        'join',
        { name: getLogin()?.username, room: 'room' },
        (error) => {
          if (error) {
            console.log(error);
            alert(error);
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket.on('disconnect', () => {
          console.log(`I'm disconnect with the back-end`);
        });
      }
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();

    console.log(222);
    if (socket) {
      socket.emit('sendMessage', message, () => console.log('enviei'));
    }
  };

  return (
    <Layout>
      <button className={`no-wrap ${theme}`} onClick={onBack}>
        Back
      </button>

      <form onSubmit={sendMessage}>
        <Input value={message} placeholder="Message" onChange={setMessage} />
        <button type="submit">Send</button>
      </form>

      {(messages || []).map((it) => (
        <p>
          {it.user}: {it.text}
        </p>
      ))}
    </Layout>
  );
};

export default Chat;
