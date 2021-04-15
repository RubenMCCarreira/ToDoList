const generate = require('tool/redux/server');

const { reducer, actions: roomActions } = generate('room');

module.exports = { roomActions, room: reducer };
