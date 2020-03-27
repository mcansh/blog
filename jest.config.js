module.exports = {
  testURL: 'http://localhost:3000/',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-styled-components',
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/types/'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
};
