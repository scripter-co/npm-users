const fs = require('fs');

const list = require('../../commands/list');
const directories = require('../../directories');

describe('Command: list', function () {

  const mockNpmUserBasePath = '/mock/npm/user/';
  const mockAliases = [
    'test-user-1',
    'test-user-2'
  ];

  beforeEach(() => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(mockAliases);
    jest.spyOn(console, 'log').mockReturnValue();
    jest.spyOn(directories, 'getNpmUsersHomeDirectory').mockReturnValue(mockNpmUserBasePath);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reads users from the correct directory', function () {
    list();

    expect(fs.readdirSync).toHaveBeenCalledWith(mockNpmUserBasePath);
  });

  test('outputs a list correct users', () => {
    list();

    mockAliases.forEach((mockUser) => expect(console.log).toHaveBeenCalledWith(mockUser));
  });

});
