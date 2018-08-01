const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        myAxios: path.resolve(__dirname, './index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}