const fs = require('fs');
const child_process = require('child_process');
const directories = require('../directories');

module.exports = (alias) => {
  const targetUserFile = directories.getNpmUsersHomeDirectory() + alias;
  const userAlreadyExists = fs.existsSync(targetUserFile);
  if (userAlreadyExists) {
    throw new Error('This user already exists. Use `npm-users list` and `npm-users remove <alias>` to resolve.');
  }

  const { status: loginStatusCode } = child_process.spawnSync('npm', ['login'], { stdio: 'inherit' });
  if (loginStatusCode !== 0) {
    throw new Error('We were unable to add this login.');
  }

  fs.copyFileSync(directories.getNpmRc(), targetUserFile);
  console.log(`${alias} has been added to npm-users`);
};
