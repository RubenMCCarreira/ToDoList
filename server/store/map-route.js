const generate = require('tool/redux/server');

const { reducer, actions: mapRouteActions } = generate('mapRoute');

module.exports = { mapRouteActions, mapRoute: reducer };
