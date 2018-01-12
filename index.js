#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

require('./setup')();

program
  .option('a, add <alias>', 'Add user')
  .option('r, remove <alias>', 'Remove user')
  .option('u, use <alias>', 'Use user')
  .option('l, list', 'List users')
  .option('w, whoami', 'Current logged in user')
  .parse(process.argv);


const commands = fs.readdirSync('./commands').reduce((commands, command) => {
  const commandWithoutExtension = command.replace('.js', '');
  return Object.assign(commands, {
    [commandWithoutExtension]: require(`./commands/${command}`)
  });
}, {});

Object.keys(commands).forEach((command) => {
  if (program[command]) {
    commands[command](program[command]);
  }
});
