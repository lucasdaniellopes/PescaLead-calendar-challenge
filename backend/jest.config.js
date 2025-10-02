  export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.ts$': ['ts-jest', {
        useESM: true
      }]
    },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1'
    }
  };