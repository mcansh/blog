/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  rootDir,
  displayName: 'test',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    'react-testing-library/cleanup-after-each',
    'jest-styled-components',
    `${rootDir}/jest.setup.js`,
  ],
  testMatch: ['**/*.test.+(js|jsx|ts|tsx)'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  testPathIgnorePatterns: [
    `${rootDir}/.next/`,
    `${rootDir}/node_modules/`,
    `${rootDir}/types/`,
  ],
};
