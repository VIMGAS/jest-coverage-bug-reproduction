// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: [
    "<rootDir>/src/modules/**/useCases/*ts",
    // "<rootDir>/src/shared/**/*ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: 'v8',
  coverageReporters: [
    "text-summary",
    "lcov",
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  testMatch: [
    "**/*.spec.ts"
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/__tests__/helpers/setEnvVars.js'],
  watchPathIgnorePatterns: ['globalConfig']
};
