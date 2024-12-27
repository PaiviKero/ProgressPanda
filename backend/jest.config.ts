/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  testPathIgnorePatterns: ['backend/src/utils/testing.ts'],
  coveragePathIgnorePatterns: ['backend/src/utils/testing.ts'],
};
