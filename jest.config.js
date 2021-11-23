module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  moduleDirectories: ['node_modules', '<rootDir>', '<rootDir>/app'],
  modulePathIgnorePatterns: ['./cypress'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/app/__tests__/utils',
    '<rootDir>/app/__tests__/data',
  ],
}