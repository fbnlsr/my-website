const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

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
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract(['css-loader?url=false', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new GoogleFontsPlugin({
            fonts: [
                { family: "Montserrat", variants: [ "300", "400", "400italic", "700", "700italic" ] },
                { family: "Open Sans", variants: [ "400", "400italic", "700", "700italic" ] },
                { family: "Ubuntu Mono", variants: [ "400", "400italic" ] }
            ]
        }),
        new ExtractTextPlugin({
            filename: "css/main.css",
            allChunks: true,
            disable: process.env.NODE_ENV === "development"
        })
    ]
};
