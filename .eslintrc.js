module.exports = {
  root: true,
  extends: ["@react-native", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  ignorePatterns: [],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "no-shadow": "off",
        "no-undef": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/ban-types": "warn",
        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/extensions": "off",
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "warn",
        "eslint-comments/disable-enable-pair": "warn",
        "eslint-comments/no-unlimited-disable": "warn",
        "no-constant-condition": "warn",
        "no-useless-catch": "warn",
        "no-empty": "warn",
        "no-useless-escape": "warn",
        "prefer-const": "warn",
        "require-yield": "warn",
        "no-empty-pattern": "warn",
        "react-native/no-inline-styles": "off"
      }
    }
  ]
};
