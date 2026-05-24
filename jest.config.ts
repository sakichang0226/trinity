/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
      diagnostics: { ignoreCodes: ['TS151001'] },
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  setupFiles: ['./jest.setup.ts'],

}
