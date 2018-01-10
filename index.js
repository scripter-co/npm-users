#!/usr/bin/env node

const program = require('commander');
const { spawnSync } = require('child_process');
const fs = require('fs');

const { version } = require('./package');
const directories = require('./directories');
const user = require('./user');
const log = console.log;
const exit = (code = 0) => process.exit(code);

require('./setup')();

program
  .option('a, add <alias>', 'Add user')
  .option('r, remove <alias>', 'Remove user')
  .option('u, use <alias>', 'Use user')
  .option('l, list', 'List users')
  .option('w, whoami', 'Current logged in user')
  .parse(process.argv);


if (program.add) {
  const targetUserFile = `${directories.getNusrmHomeDirectory()}/${program.add}`;

  const userAlreadyExists = fs.existsSync(targetUserFile);
  if (userAlreadyExists) {
    log('This user already exists. Use `nusrm list` and `nusrm remove` to resolve.');

    exit(1);
  }

  const loginProcess = spawnSync('npm', ['login'], { stdio: 'inherit' });
  if (loginProcess.status !== 0)  {
    log('We were unable to add this login.');

    exit(1);
  }

  fs.copyFileSync(directories.getNpmRc(), targetUserFile);
  log('This user has been added to nusrm');

  exit();
}

if (program.list) {
  const users = fs.readdirSync(directories.getNusrmHomeDirectory());
  users.forEach((user, index) => log(user));

  process.exit();
}

if (program.whoami) {
  spawnSync('npm', ['whoami'], { stdio: 'inherit' });

  process.exit();
}

if (program.remove) {
  const { remove: username } = program;
  user.remove(username);

  exit();
}

if (program.use) {
  const { use: username } = program;
  user.use(username);

  exit();
}
