const sample = require('./sample');
const login = require('./login');

exports.bind = (app) => {
  app.use('/api/sample', sample);
  app.use('/auth', login);
};
