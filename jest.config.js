/** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["./node_modules", "src"],
};

module.exports = config;
