const fs = require('fs');
const directories = require('../directories');

module.exports = (alias) => {
  const targetUserFile = directories.getNpmUsersHomeDirectory() + alias;
  const userNotFound = !fs.existsSync(targetUserFile);
  if (userNotFound) {
    throw new Error('The specified user could not be found.');
  }

  const npmRcFileExists = fs.existsSync(directories.getNpmRc());
  if (npmRcFileExists) {
    fs.unlinkSync(directories.getNpmRc());
  }

  fs.copyFileSync(targetUserFile, directories.getNpmRc());

  console.log(`Now logged in to NPM as ${alias}`);
};
