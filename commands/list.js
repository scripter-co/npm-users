const fs = require('fs');
const directories = require('../directories');

module.exports = () => {
  const users = fs.readdirSync(directories.getNpmUsersHomeDirectory());
  users.forEach((user, index) => console.log(user));

  process.exit();
};
