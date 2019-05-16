const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  rootDir,
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: ['**/*.+(js|jsx|ts|tsx)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  testPathIgnorePatterns: [
    `${rootDir}/.next/`,
    `${rootDir}/node_modules/`,
    `${rootDir}/__tests__`,
  ],
};
