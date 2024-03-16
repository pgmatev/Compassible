/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/support/setup.ts'],
    maxConcurrency: 1,
    maxWorkers: 1
  };
  