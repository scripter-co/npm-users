const { spawnSync } = require('child_process');

module.exports = () => {
  spawnSync('npm', ['whoami'], { stdio: 'inherit' });

  process.exit();
};
