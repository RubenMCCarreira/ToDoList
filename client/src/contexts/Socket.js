import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { getLogin } from '../tools/cookies';
import socketClient from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
      });
      socket.emit(
        'join',
        { name: getLogin()?.username, room: 'room' },
        (error) => {
          if (error) {
            // alert(error);
          }
        }
      );
      socket.on('disconnect', () => {
        console.log(`I'm disconnect with the back-end`);
      });
    }
  }, [socket]);

  const connect = useCallback(() => {
    if (!socket) {
      setSocket(
        socketClient('http://localhost:5000/', {
          transports: ['websocket']
        })
      );
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  const onMessage = useCallback(
    (callback) => {
      if (socket) {
        socket.on('message', callback);
      }
    },
    [socket]
  );

  const onWelcome = useCallback(
    (callback) => {
      if (socket) {
        socket.on('welcome', callback);
      }
    },
    [socket]
  );

  const onRoomData = useCallback(
    (callback) => {
      if (socket) {
        socket.on('roomData', callback);
      }
    },
    [socket]
  );

  const sendMessage = useCallback(
    (message, callback) => {
      if (socket) {
        socket.emit('sendMessage', message, callback);
      }
    },
    [socket]
  );

  const value = {
    socket,
    connect,
    disconnect,
    onMessage,
    onWelcome,
    onRoomData,
    sendMessage
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
