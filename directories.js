const os = require('os');

const userHomeDirectory = os.homedir();
const npmUsersRootDirectory = `${userHomeDirectory}/.npm-users/`;
const npmRc = `${userHomeDirectory}/.npmrc`;

module.exports = {
  getNpmUsersHomeDirectory: () => npmUsersRootDirectory,
  getNpmRc: () => npmRc
};
