const { state, dispatch } = require('./store');
const { chatActions } = require('./store/chat');

const users = [];
const messages = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const addMessage = (message) => {
  chatActions.ADD(dispatch, message);
  messages.push(message);
};

const getMessagesInRoom = (room) => {
  return messages.filter((it) => it.room == room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getMessagesInRoom, addMessage };