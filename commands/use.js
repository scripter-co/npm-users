const user = require('../user');

module.exports = (username) => {
  user.use(username);

  process.exit();
};
