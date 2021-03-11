const generate = require('common/redux/server');

const { reducer, actions: themeActions } = generate('theme');

module.exports = { themeActions, theme: reducer };
