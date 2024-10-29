module.exports = {
    // Remove the deprecated `globals` usage and directly configure ts-jest with `transform`
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.(ts|tsx)$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.json', // specify tsconfig without `globals`
        },
      ],
    },
    testMatch: ['**/tests/**/*.test.(ts|js)'],
    testEnvironment: 'node',
  
    // Map the 'src/*' path alias
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    // Exclude tests in the dist folder
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
  