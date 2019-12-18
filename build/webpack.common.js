const path = require('path');
const rootDir = path.resolve('./');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        lottery: rootDir + '/public/javascript/categories/lottery.js',
        province: rootDir + '/public/javascript/categories/province.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, '../dist/js')
    },
    performance: {
        maxEntrypointSize: 2097152,
        maxAssetSize: 2097152
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_module|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]  //Preset used for env setup
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        // options: {
                        //     sourceMap: isDevelopment,
                        //     minimize: !isDevelopment
                        // }
                    },
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         autoprefixer: {
                    //             browsers: ["last 2 versions"]
                    //         },
                    //         sourceMap: isDevelopment,
                    //         plugins: () => [
                    //             autoprefixer
                    //         ]
                    //     },
                    // },
                    // {
                    //     loader: "sass-loader",
                    //     options: {
                    //         sourceMap: isDevelopment
                    //     }
                    // }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.(jpe?g|jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/',
                            useRelativePath: true,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/']),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     jquery: "jquery"
        // }),

        new MiniCssExtractPlugin({
            filename: "../css/[name]-styles.css",
            chunkFilename: "[id].css"
        }),
        // new CopyPlugin([
        //     { from: rootDir + '/sources/images/', to: rootDir + '/public/images' },
        //     { from: rootDir + '/sources/plugins/', to: rootDir + '/public/plugins' },
        //     { from: rootDir + '/sources/fonts/', to: rootDir + '/public/fonts' },
        // ]),
        // new HtmlWebpackPlugin({
        // title: 'My killer app'
        // })
    ],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	},
};