const directories = require('../directories');
const fs = require('fs');

module.exports = (alias) => {
  const targetUserFile = directories.getNpmUsersHomeDirectory() + alias;
  const userNotFound = fs.existsSync(targetUserFile) === false;
  if (userNotFound) {
    throw new Error('The specified user could not be found.');
  }

  fs.unlinkSync(targetUserFile);

  console.log(`Removed user ${alias}`);
};
