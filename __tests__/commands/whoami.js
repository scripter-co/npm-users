const child_process = require('child_process');

const whoami = require('../../commands/whoami');

describe('Command: whoami', () => {

  beforeEach(() => {
    jest.spyOn(child_process, 'spawnSync').mockReturnValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls npm whoami with the correct params', () => {
    whoami();

    expect(child_process.spawnSync).toHaveBeenCalledWith('npm', ['whoami'], { stdio: 'inherit' });
  });

});
