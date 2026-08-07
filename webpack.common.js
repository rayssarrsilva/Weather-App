import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import Dotenv from "dotenv-webpack";

export default {
  entry: "./src/index.js",
  
  output: {
    filename: "main.js",
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4|webm|ogg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "asset/fonts/[name][ext]",
        },
      },
    ],
  },
};
