const fs = require('fs');

const directories = require('../../directories');
const remove = require('../../commands/remove');

describe('Command: remove <alias>', () => {

  const mockAlias = 'test-alias';
  const mockNpmUserBasePath = '/mock/npm/user/';

  beforeEach(() => {
    jest.spyOn(directories, 'getNpmUsersHomeDirectory').mockReturnValue(mockNpmUserBasePath);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'unlinkSync').mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('checks the alias file exists with the correct directory', () => {
    remove(mockAlias);

    expect(fs.existsSync).toHaveBeenCalledWith(mockNpmUserBasePath + mockAlias);
  });

  test('throws an error when the alias does not exist', () => {
    fs.existsSync.mockReturnValue(false);

    expect(remove).toThrowError('The specified user could not be found.');
  });

  test('removes the alias file if it exists', () => {
    remove(mockAlias);

    expect(fs.unlinkSync).toHaveBeenCalledWith(mockNpmUserBasePath + mockAlias);
  });

  test('outputs a message informing the user the user has been deleted', () => {
    remove(mockAlias);

    expect(console.log).toHaveBeenCalledWith(`Removed user ${mockAlias}`);
  });

});
