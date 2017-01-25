/*
 *
 */

module.exports = {
    entry: `${__dirname}/main.jsx`,
    output: {
        path: `${__dirname}/dist/`,
        filename: 'example.js'
    },
    resolve: {
        extensions: [".jsx", ".js", ""]
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    }
}