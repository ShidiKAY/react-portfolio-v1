/* eslint-disable no-undef */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/styleMock.js",
    "^react-i18next$": "<rootDir>/src/__mocks__/react-i18next.js",
  },
};
