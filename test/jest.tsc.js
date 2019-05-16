const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  rootDir,
  runner: 'jest-runner-tsc',
  displayName: 'tsc',
  testPathIgnorePatterns: [
    `${rootDir}/.next/`,
    `${rootDir}/node_modules/`,
    `${rootDir}/types/`,
  ],
};
