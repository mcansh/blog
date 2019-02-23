module.exports = {
  testURL: 'http://localhost:3000/',
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  projects: [
    '<rootDir>/test/jest.eslint.js',
    '<rootDir>/test/jest.testing.js',
    // '<rootDir>/test/jest.tsc.js',
  ],
};
