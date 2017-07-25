const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MultipageWebpackPlugin  = require('multipage-webpack-plugin')

module.exports = {
    entry: {
       'js/index': './src/js/index',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].[chunkhash].js',
        publicPath: './',
        // pathinfo: true
        // filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist/')),
        new webpack.HashedModuleIdsPlugin(), // require 后面的变成了id，而不是0,1,2,3
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.[chunkhash].js',
            // filename: 'vendor.js',
            minChunks (module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "js/manifest",
            minChunks: Infinity
        }),
        // new MultipageWebpackPlugin(),
        // new MultipageWebpackPlugin({
        //     templateFilename: '[name].html', 
        //     templatePath: path.join(__dirname, 'html')
        // }),
        new HtmlWebpackPlugin({
            title: 'mnz'
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'html/pageB.html'
        // }),
        function() {
            this.plugin('done', function(stats) {
                // var s = fs.existsSync(path.join(__dirname, 'dist/'))
                fs.writeFileSync(
                    path.join(__dirname, 'stats.json'),
                    JSON.stringify(stats.toJson().assetsByChunkName)
                )
            })
        }
    ]
}