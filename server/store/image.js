const generate = require('tool/redux/server');

const { reducer, actions: imageActions } = generate('image');

module.exports = { imageActions, image: reducer };
