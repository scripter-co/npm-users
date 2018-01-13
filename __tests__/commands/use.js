const fs = require('fs');

const directories = require('../../directories');
const use = require('../../commands/use');

describe('Command: use', () => {

  const mockAlias = 'test-alias';
  const mockNpmUserBasePath = '/mock/npm/user/';
  const mockNpmRcBasePath = '/mock/npmrc/';

  beforeEach(() => {
    jest.spyOn(directories, 'getNpmUsersHomeDirectory').mockReturnValue(mockNpmUserBasePath);
    jest.spyOn(directories, 'getNpmRc').mockReturnValue(mockNpmRcBasePath);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'copyFileSync').mockReturnValue();
    jest.spyOn(fs, 'unlinkSync').mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('checks the alias file exists with the correct directory', () => {
    use(mockAlias);

    expect(fs.existsSync).toHaveBeenCalledWith(mockNpmUserBasePath + mockAlias);
  });

  test('throws an error when the alias does not exist', () => {
    fs.existsSync.mockReturnValue(false);

    expect(use).toThrowError('The specified user could not be found.');
  });

  test('removes the existing .npmrc file if one exists', () => {
    use();

    expect(fs.unlinkSync).toHaveBeenCalledWith(mockNpmRcBasePath);
  });

  test('copies the alias file to ~/.npmrc', () => {
    fs.existsSync
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    use(mockAlias);

    expect(fs.copyFileSync).toHaveBeenCalledWith(mockNpmUserBasePath + mockAlias, mockNpmRcBasePath);
  });

  test('outputs a message informing the user the user has been used', () => {
    fs.existsSync
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    use(mockAlias);

    expect(console.log).toHaveBeenCalledWith(`Now logged in to NPM as ${mockAlias}`);
  });

});
