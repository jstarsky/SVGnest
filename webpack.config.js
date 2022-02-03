const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:4001/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "svgnest",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {},
      shared: {
        ...deps,
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),    
    new AddAssetHtmlPlugin([
      { filepath: require.resolve('./src/util/clipper') },
      { filepath: require.resolve('./src/util/domparser') },
      { filepath: require.resolve('./src/util/eval') },
      { filepath: require.resolve('./src/util/filesaver') },
      { filepath: require.resolve('./src/util/geometryutil') },
      { filepath: require.resolve('./src/util/json') },
      { filepath: require.resolve('./src/util/matrix') },
      { filepath: require.resolve('./src/util/parallel') },
      { filepath: require.resolve('./src/util/pathsegpolyfill') },
      { filepath: require.resolve('./src/util/placementworker') },
      { filepath: require.resolve('./src/svgnest') },
      { filepath: require.resolve('./src/svgparser') },

    ]),
  ],
};
