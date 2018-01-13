const fs = require('fs');

const directory = require('../directories');
const setup = require('../setup');

describe('setup()', () => {

  const mockNpmUserBasePath = '/mock/npm/user/';

  beforeEach(() => {
    jest.spyOn(directory, 'getNpmUsersHomeDirectory').mockReturnValue(mockNpmUserBasePath);
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'mkdirSync').mockReturnValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('setupHomeDirectory()', function () {

    test('creates the npm user directory if it does not exist', () => {
      setup();

      expect(fs.mkdirSync).toHaveBeenCalledWith(mockNpmUserBasePath);
    });

    test('does not create the npm user directory if it already exists', () => {
      fs.existsSync.mockReturnValue(true);

      setup();

      expect(fs.mkdirSync).not.toHaveBeenCalled();
    });

  });

});
