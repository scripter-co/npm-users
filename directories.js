const os = require('os');

module.exports = {
  getNpmUsersHomeDirectory: () => `${os.homedir()}/.npm-users/`,
  getNpmRc: () => `${os.homedir()}/.npmrc`
};
