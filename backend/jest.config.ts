/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testPathIgnorePatterns: ['backend/src/utils/testing.ts'],
  coveragePathIgnorePatterns: ['backend/src/utils/testing.ts'],
  coverageThreshold: {
    global: {
      functions: 100,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
