const generate = require('tool/redux/server');

const { reducer, actions: chatActions } = generate('chat');

module.exports = { chatActions, chat: reducer };
