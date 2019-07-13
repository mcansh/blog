const { join } = require('path');

const rootDir = join(__dirname, '..');

module.exports = {
  rootDir,
  displayName: 'test',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each',
    'jest-styled-components',
  ],
  testPathIgnorePatterns: [
    `${rootDir}/.next/`,
    `${rootDir}/node_modules/`,
    `${rootDir}/types/`,
  ],
};
