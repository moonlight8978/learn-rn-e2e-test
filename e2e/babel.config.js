module.exports = {
  presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-typescript"],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [".ts", ".tsx", ".js", ".jsx", "json"],
        alias: {
          "@src": "./",
        },
      },
    ],
  ],
};
