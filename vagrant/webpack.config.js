/**
 * Created by michal frystacky on 11/27/16.
 */

var webpack = require('webpack');

// @Ref: https://blog.risingstack.com/the-react-way-getting-started-tutorial/
// @Ref: https://www.codementor.io/tamizhvendan/tutorials/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr
// @Ref: http://survivejs.com/webpack/advanced-techniques/configuring-react/
module.exports = {
    entry: `${__dirname}/src/app.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin
    ]
}