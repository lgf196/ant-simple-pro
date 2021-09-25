module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.tsx$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx,js,jsx}'],
  coverageDirectory: '<rootDir>/coverage/',,
  verbose: true,
  testTimeout: 30000,

  testEnvironment: 'jsdom',

  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '(.*).d.ts$'],

  moduleNameMapper: {
    '^.+\\.module\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'identity-obj-proxy',
  },
};
