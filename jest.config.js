module.exports = {
  testURL: 'http://localhost:3000/',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-styled-components',
    './jest.setup.js',
  ],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/types/'],
};
