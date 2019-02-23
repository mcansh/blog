/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  rootDir,
  runner: 'jest-runner-tsc',
  displayName: 'tsc',
  testMatch: ['**/*.+(ts|tsx)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  testPathIgnorePatterns: [
    `${rootDir}/.next/`,
    `${rootDir}/node_modules/`,
    `${rootDir}/types/`,
  ],
};
