/**
 * @Author: le
 * @Date: 2016/11/5
 */
// see https://www.npmjs.com/package/webpack-merge
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
})