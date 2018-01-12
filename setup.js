const fs = require('fs');
const directories = require('./directories');

function setupHomeDirectory() {
  const directory = directories.getNpmUsersHomeDirectory();

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
}

module.exports = () => {
  setupHomeDirectory();
};
