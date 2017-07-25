const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
       'js/index': './src/js/index',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
        publicPath: './',
        // pathinfo: true
        // filename: '[name].js'
    },
    devtool: "eval",
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
        // new CleanWebpackPlugin(path.resolve(__dirname, 'dist/')),
        //https://github.com/shaodahong/dahong/issues/8
        // new webpack.HashedModuleIdsPlugin(), // require 后面的变成了id(稳定的，而不是递增的数字)，而不是0,1,2,3
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            minChunks (module) {
                return module.context && module.context.indexOf('node_modules') >= 0;
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "js/manifest",
        //     minChunks: Infinity
        // }),
        new HtmlWebpackPlugin({
            title: 'mnz'
        }),
        //https://github.com/shaodahong/dahong/issues/8        
        // 用一个manifest来保存webpack runtime代码，虽然会多一个文件，但是我们可以用长效缓存的优点来掩盖这一切，因为webpack runtime很少，我们没有必要单独去加载这个js，可以内联到html的头部
        // new HtmlWebpackInlineAssetsPlugin({
        //     // head: '.(js|css)$',
        //     // body: '.(js|css)$',
        //     body: 'manifest.'
        // }),
        // function() {
        //     this.plugin('done', function(stats) {
        //         // var s = fs.existsSync(path.join(__dirname, 'dist/'))
        //         fs.writeFileSync(
        //             path.join(__dirname, 'stats.json'),
        //             JSON.stringify(stats.toJson().assetsByChunkName)
        //         )
        //     })
        // }
    ]
}