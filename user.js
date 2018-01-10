const fs = require('fs');
const directories = require('./directories');

const log = console.log;
const exit = (code = 0) => process.exit(code);

function validateUserExists(username) {
  const targetUserFile = `${directories.getNusrmHomeDirectory()}/${username}`;
  const userNotFound = !fs.existsSync(targetUserFile);
  if (userNotFound) {
    log('The specified user could not be found.');

    exit(1);
  }
}

function remove(username) {
  validateUserExists(username);

  const targetUserFile = `${directories.getNusrmHomeDirectory()}/${username}`;

  fs.unlink(targetUserFile);

  log(`Removed user ${username}`);
}

function use(username) {
  validateUserExists(username);

  const targetUserFile = `${directories.getNusrmHomeDirectory()}/${username}`;
  const npmRcFileExists = fs.existsSync(directories.getNpmRc());
  if (npmRcFileExists) {
    fs.unlink(directories.getNpmRc());
  }

  fs.copyFileSync(targetUserFile, directories.getNpmRc());

  log(`Now logged in to NPM as ${username}`);
}

module.exports = {
  validateUserExists,
  remove,
  use
};
