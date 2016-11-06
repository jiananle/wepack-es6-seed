var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('../config')
var utils = require('./util')
var webpackBaseConf = require('./webpack.base.conf')

// https://github.com/glenjamin/webpack-hot-middleware
// https://webpack.github.io/docs/multiple-entry-points.html
Object.keys(webpackBaseConf.entry).forEach(function (name) {
    webpackBaseConf.entry[name] = ['./build/dev-client'].concat(webpackBaseConf.entry[name])
})

module.exports = merge(webpackBaseConf, {
    devtools: '#eval-source-map',

    module: {
        loaders: utils.styleLoaders({})
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),

        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
})