// webpack.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Add this 
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    entry: './src/index.tsx', // Your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'modal.js', // Set your desired static filename
        libraryTarget: 'umd', // Optional: allows your module to be used in various environments
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'], // Handle .ts and .tsx files
        // alias: {
        //     react: path.resolve(__dirname, 'public/react.production.min.js'),
        //     'react-dom': path.resolve(__dirname, 'public/react-dom.production.min.js'),
        // },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Match .ts and .tsx files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            // File Loader for Images
            // {
            //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //   type: 'asset/resource',
            // },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]', // Retain original file name and extension
                            outputPath: 'assets/', // Specify the output directory for the images
                            publicPath: 'assets/', // Specify the public URL of the output directory
                        },
                    },
                ],
            },
            // CSS Loader
            {
                test: /\.css$/, // Match .css files
                use: [
                    'style-loader', // Inject CSS into the DOM
                    'css-loader', // Load CSS files
                    'postcss-loader', // Process CSS with PostCSS (for Tailwind CSS)
                ],
            },
            {
                test: /\.js$/, // Match .js files
                use: 'copy-loader', // Use copy-loader to copy .js files
                exclude: /node_modules/, // Exclude node_modules from being copied
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public'), // Source folder
                    to: path.resolve(__dirname, 'dist'), // Destination folder
                    globOptions: {
                        ignore: ['*.css'], // Optionally ignore certain files
                    },
                },
                {
                    from: path.resolve(__dirname, 'node_modules/react/umd/react.production.min.js'),
                    to: path.resolve(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'node_modules/react-dom/umd/react-dom.production.min.js'),
                    to: path.resolve(__dirname, 'dist'),
                }
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        }),
        new Dotenv({
            path: './.env', // Specify your .env file path here
        }),
        new webpack.DefinePlugin(envKeys),
    ],
    externals: {
        react: 'React', // Treat React as an external dependency
        'react-dom': 'ReactDOM', // Treat ReactDOM as an external dependency
    },
    mode: 'production', // Set mode to production or development as needed
};
