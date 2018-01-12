const fs = require('fs');
const { spawnSync } = require('child_process');
const directories = require('../directories');

module.exports = (alias) => {
  const targetUserFile = `${directories.getNpmUsersHomeDirectory()}/${alias}`;

  const userAlreadyExists = fs.existsSync(targetUserFile);
  if (userAlreadyExists) {
    console.log('This user already exists. Use `npm-users list` and `npm-users remove <alias>` to resolve.');

    process.exit(1);
  }

  const loginProcess = spawnSync('npm', ['login'], { stdio: 'inherit' });
  if (loginProcess.status !== 0)  {
    console.log('We were unable to add this login.');

    process.exit(1);
  }

  fs.copyFileSync(directories.getNpmRc(), targetUserFile);
  console.log('This user has been added to npm-users');

  process.exit(0);
};
