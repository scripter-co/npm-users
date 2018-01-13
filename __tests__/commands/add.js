const fs = require('fs');
const child_process = require('child_process');

const directories = require('../../directories');
const add = require('../../commands/add');

describe('Command: add <alias>', () => {

  const mockNpmUserBasePath = '/mock/npm/user/';
  const mockNpmRcBasePath = '/mock/npmrc/';
  const mockAlias = 'test-alias';

  beforeEach(() => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'copyFileSync').mockReturnValue();
    jest.spyOn(console, 'log').mockReturnValue();
    jest.spyOn(child_process, 'spawnSync').mockReturnValue({
      status: 0
    });
    jest.spyOn(directories, 'getNpmUsersHomeDirectory').mockReturnValue(mockNpmUserBasePath);
    jest.spyOn(directories, 'getNpmRc').mockReturnValue(mockNpmRcBasePath);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('uses the alias to check for existing users', () => {
    add(mockAlias);

    expect(fs.existsSync).toHaveBeenCalledWith(mockNpmUserBasePath + mockAlias);
  });

  test('throws an error if the alias already exists', () => {
    fs.existsSync.mockReturnValue(true);

    expect(add).toThrowError('This user already exists. Use `npm-users list` and `npm-users remove <alias>` to resolve.');
  });

  test('throws an error if the user does not log in correctly', () => {
    child_process.spawnSync.mockReturnValue({
      status: 1
    });

    expect(add).toThrowError('We were unable to add this login.');
  });

  test('calls npm login with the correct params', () => {
    add();

    expect(child_process.spawnSync).toHaveBeenCalledWith('npm', ['login'], { stdio: 'inherit' });
  });

  test('copies the users login credentials into the correct directory with the correct alias', () => {
    add(mockAlias);

    expect(fs.copyFileSync).toHaveBeenCalledWith(mockNpmRcBasePath, mockNpmUserBasePath + mockAlias);
  });

  test('outputs the correct log message when the user logs in', () => {
    add(mockAlias);

    expect(console.log).toHaveBeenCalledWith('test-alias has been added to npm-users');
  });

});
