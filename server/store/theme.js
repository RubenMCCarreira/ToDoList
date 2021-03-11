const generate = require('tool/redux/server');

const { reducer, actions: themeActions } = generate('theme');

module.exports = { themeActions, theme: reducer };
