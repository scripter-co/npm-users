const program = require('commander');

const cli = require('../cli');

describe('entry', () => {

  beforeEach(() => {
    jest.spyOn(program, 'option');
    jest.spyOn(program, 'parse').mockReturnValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('all of the correct options are defined', () => {
    const commands = [
      ['a, add <alias>', 'Add user'],
      ['r, remove <alias>', 'Remove user'],
      ['u, use <alias>', 'Use user'],
      ['l, list', 'List users'],
      ['w, whoami', 'Current logged in user']
    ];

    cli();

    commands.forEach((command) => {
      expect(program.option).toHaveBeenCalledWith(...command);
    });
  });

});
