import { useEffect, useState } from 'react';
import withInjectReducer from 'tool/redux/withInjectReducer';
import { useThemeContext } from '../contexts/Theme';
import { getLogin } from '../tools/cookies';
import { useSocketContext } from '../contexts/Socket';
import reducer, {
  roomMapDispatchToProps,
  roomMapStateToProps,
  stateRoomKey
} from '../store/room';
import Form from './Form';
import Paragraph from '../components/Paragraph';
import Span from '../components/Span';
import Div from '../components/Div';
import { IRoom, IMessage } from '../interfaces';

interface RoomProps {
  activeId: null | number;
  item: null | IRoom;
  getItem: Function;
}

const Room = ({ activeId, item, getItem }: RoomProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
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

  const handleSendMessage = (item) => {
    if (socket) {
      sendMessage(item.message, () => console.log('sent'));
    }
  };

  return item ? (
    <Div>
      <Div id="messages">
        {messages.map(({ id, user, text }) => {
          const userSelf = user == getLogin().username;

          return (
            <Paragraph key={id} className={`${userSelf ? 'user-self' : ''}`}>
              <Span>{userSelf ? 'You' : user}:</Span> {text}
            </Paragraph>
          );
        })}
      </Div>

      <Form
        items={[
          {
            prop: 'message',
            placeholder: 'Message',
            mandatory: true,
            hideTitle: true
          }
        ]}
        callback={handleSendMessage}
        label="Send"
      />
    </Div>
  ) : (
    <Div>
      <Paragraph>Select one room</Paragraph>
    </Div>
  );
};

export default withInjectReducer(
  stateRoomKey,
  reducer,
  roomMapStateToProps,
  roomMapDispatchToProps,
  Room
);
