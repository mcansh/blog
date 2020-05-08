module.exports = {
  testURL: 'http://localhost:3000/',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    '!components/styles/*',
    'pages/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-styled-components',
  ],
  testPathIgnorePatterns: ['/.next/', '/node_modules/', '/@types/'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/@svgr/webpack.js',
    '~/(.*)': '<rootDir>/$1',
  },
};
