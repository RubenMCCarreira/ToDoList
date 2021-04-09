import ToDos from '../containers/ToDos';
import NewToDo from '../containers/NewToDo';
import Dropdown from '../components/Dropdown';
import { useThemeContext } from '../contexts/Theme';
import Layout from '../containers/Layout';
import socketClient from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import Input from '../components/Input';

const Chat = ({ history }) => {
  const { theme } = useThemeContext();
  const [socket, setSocket] = useState(null);

  const [name, setName] = useState(null);
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
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setMessages((messages) => [...messages, data]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('roomData', ({ users }) => {
        console.log(222, users);
      });
    }
  }, [socket]);

  const register = (e) => {
    e.preventDefault();

    console.log(11111);
    if (socket) {
      socket.emit('join', { name: `${name}`, room: 'room' }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  };

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
      <form onSubmit={register}>
        <Input value={name} placeholder="Name" onChange={setName} />
        <button type="submit">Register</button>
      </form>

      <form onSubmit={sendMessage}>
        <Input value={message} placeholder="Message" onChange={setMessage} />
        <button type="submit">Send</button>
      </form>

      {messages.map((it) => (
        <p>
          {it.user}: {it.text}
        </p>
      ))}
    </Layout>
  );
};

export default Chat;
