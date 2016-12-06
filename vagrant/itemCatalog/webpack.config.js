/**
 * Created by michal frystacky on 11/27/16.
 */
// @Ref: https://blog.risingstack.com/the-react-way-getting-started-tutorial/
// @Ref: https://www.codementor.io/tamizhvendan/tutorials/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr
// @Ref: http://survivejs.com/webpack/advanced-techniques/configuring-react/

module.exports = {
    entry: `${__dirname}/static/js/restaurant.jsx`,
    output: {
        path: `${__dirname}/static/js`,
        filename: 'restaurants.js'
    },
    resolve: {
        extensions: ["", ".jsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}