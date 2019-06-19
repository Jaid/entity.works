module.exports = {
  testEnvironment: "node",
  coverageDirectory: "dist/jest/coverage",
  collectCoverageFrom: ["src/**"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],
  moduleNameMapper: {
    "^root": "<rootDir>",
    "^src": "<rootDir>/src",
    "^lib": "<rootDir>/src/lib",
    "^components": "<rootDir>/src/components",
    "^mainActions$": "<rootDir>/src/redux/mainActions",
  },
}