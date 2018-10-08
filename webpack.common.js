const path = require('path');

module.exports = {
    // performance: {
    //     hints: false
    // },
    entry: './assets/js/main.js',
    output: {
        filename: 'js/main.min.js',
        path: path.resolve(__dirname, 'static')
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-env']
    //                 }
    //             }
    //         },
    //     ]
    // },
};
