module.exports = {
  extends: "@denkristoffer/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    "jest/no-deprecated-functions": "off",
  },
};
