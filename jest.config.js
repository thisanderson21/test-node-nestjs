module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/src'],
};