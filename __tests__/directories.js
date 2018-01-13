const os = require('os');

const directories = require('../directories');

describe('directories', () => {

  beforeEach(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/mock/home');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getNpmUsersHomeDirectory() return the correct value', () => {
    expect(directories.getNpmUsersHomeDirectory()).toEqual('/mock/home/.npm-users/');
  });

  test('getNpmRc() return the correct value', () => {
    expect(directories.getNpmRc()).toEqual('/mock/home/.npmrc');
  });

});
