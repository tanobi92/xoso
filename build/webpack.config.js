const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: {
        action: './public/javascript/lottery.js'
    } ,
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, '../dist/js')
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, "../src"),
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
                        options: {
                            sourceMap: isDevelopment,
                            minimize: !isDevelopment
                        }
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
                test: /\.(jpg|png|gif)$/,
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
	    new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery"
	    }),
        /** Since Webpack 4 */
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
          }),
          new MiniCssExtractPlugin({
            filename: "../css/[name]-styles.css",
            chunkFilename: "[id].css"
          }),  
      ]
  };