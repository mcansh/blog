const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  rootDir,
  displayName: 'test',
  setupFilesAfterEnv: [
    'jest-dom/extend-expect',
    'react-testing-library/cleanup-after-each',
    'jest-styled-components',
  ],
  testPathIgnorePatterns: [
    `${rootDir}/.next/`,
    `${rootDir}/node_modules/`,
    `${rootDir}/types/`,
  ],
};
