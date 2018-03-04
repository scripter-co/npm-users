const program = require('commander');
const fs = require('fs');
const path = require('path');

function getMappedCommands() {
  return fs.readdirSync(path.resolve(__dirname, './commands')).reduce((commands, command) => {
    const commandWithoutExtension = command.replace('.js', '');

    return Object.assign(commands, {
      [commandWithoutExtension]: require(`./commands/${command}`)
    });
  }, {});
}

function findAndExecuteOption(commands) {
  Object.keys(commands).forEach((command) => {
    const commandCallback = commands[command];
    const commandValue = program[command];
    const commandWasCalled = program.hasOwnProperty(command);

    if (commandWasCalled) {
      commandCallback(commandValue);
    }
  });
}

module.exports = (args = process.argv) => {
  program
    .option('a, add <alias>', 'Add user')
    .option('r, remove <alias>', 'Remove user')
    .option('u, use <alias>', 'Use user')
    .option('l, list', 'List users')
    .option('w, whoami', 'Current logged in user')
    .parse(args);

  findAndExecuteOption(getMappedCommands());
};
