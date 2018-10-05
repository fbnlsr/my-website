const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
    entry: ['./assets/js/main.js', './assets/scss/main.scss'],
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'static')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                // loader: ExtractTextPlugin.extract(['css-loader?url=false', 'sass-loader'])
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    // you can specify a publicPath here
                    // by default it use publicPath in webpackOptions.output
                    publicPath: 'public/css'
                    }
                },
                "css-loader"
                ]
            }
        ]
    },
    plugins: [
        // new GoogleFontsPlugin({
        //     fonts: [
        //         { family: "Montserrat", variants: [ "300", "400", "400italic", "700", "700italic" ] },
        //         { family: "Open Sans", variants: [ "400", "400italic", "700", "700italic" ] },
        //         { family: "Ubuntu Mono", variants: [ "400", "400italic" ] }
        //     ]
        // }),
        // new ExtractTextPlugin({
        //     filename: "css/main.css",
        //     allChunks: true,
        //     disable: process.env.NODE_ENV === "development"
        // })
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "main.css",
            // chunkFilename: "[id].css"
          })
    ]
};
