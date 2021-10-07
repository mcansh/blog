module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testURL: 'http://localhost:3000/',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.{js,jsx,ts,tsx}'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {
    'ts-jest': {
      tsconfig: './app/tsconfig.json',
    },
  },
};
