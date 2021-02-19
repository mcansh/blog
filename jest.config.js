module.exports = {
  testURL: 'http://localhost:3000/',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  transform: {
    '\\.[jt]sx?$': 'esjest-transform',
  },
};
