const os = require('os');

const userHomeDirectory = os.homedir();
const nusrmRootDirectory = `${userHomeDirectory}/.nusrm`;
const npmRc = `${userHomeDirectory}/.npmrc`;

module.exports = {
  getHomeDirectory: () => userHomeDirectory,
  getNusrmHomeDirectory: () => nusrmRootDirectory,
  getNpmRc: () => npmRc
}
