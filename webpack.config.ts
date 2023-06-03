import path from "path";
import { Configuration } from "webpack";
import devServer from 'webpack-dev-server';
const ESLintPlugin = require('eslint-webpack-plugin');

const config: Configuration = {
    mode: 'development',
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    devServer: {
        static: path.join(__dirname, "build"),
        compress: true,
        port: 4000,
    },
    plugins: [
        new ESLintPlugin({
            outputReport: {
                formatter: "HTML",
                filePath: './eslint_report.html',
            },
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            eslintPath: require.resolve('eslint')
        })
    ],
};

export default config;