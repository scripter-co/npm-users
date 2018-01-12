const user = require('../user');

module.exports = (username) => {
  user.remove(username);

  process.exit();
};
