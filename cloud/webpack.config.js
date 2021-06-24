const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        css: './src/css/index.css',
        js: './src/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.config.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('postcss-import')({
                                        root: loader.resourcePath,
                                        addDependencyTo: webpack
                                    }),
                                    require('postcss-cssnext')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'babel-preset-stage-0', 'babel-preset-stage-1']
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new CleanWebpackPlugin(['./public/assets'], {
            root: path.join(__dirname, '/..')
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    watch: true
};