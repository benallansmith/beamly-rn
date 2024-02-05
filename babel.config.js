const path = require("path");

module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json"
        ],
        alias: {
          react: path.join(__dirname, "node_modules/react"),
          "@types": "./src/types",
          "@components": "./src/components",
          "@contexts": "./src/contexts",
          "@screens": "./src/screens"
        }
      }
    ],
    "nativewind/babel",
    "react-native-paper/babel"
  ]
};
