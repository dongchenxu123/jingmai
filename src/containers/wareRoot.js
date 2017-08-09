if (process.env.NODE_ENV === 'production') {
  module.exports = require('./wareRoot.prod');

} else {
  module.exports = require('./wareRoot.dev');
}
