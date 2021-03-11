const generate = require('common/redux/server');

const { reducer, actions: todoActions } = generate('todo');

module.exports = { todoActions, toDo: reducer };
