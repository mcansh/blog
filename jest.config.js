module.exports = {
  testURL: 'http://localhost:3000/',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each',
    'jest-styled-components',
  ],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/types/'],
};
