const generate = require('tool/redux/server');

const { reducer, actions: loginActions } = generate('login');

module.exports = { loginActions, login: reducer };
