/**
 * @Author: le
 * @Date: 2016/11/5
 */

var path = require('path')
var glob = require('glob')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var utils = require('./util')
var projectRoot = path.resolve(__dirname, '../')
var srcDir = path.resolve(projectRoot, './src')
var distDir = path.resolve(projectRoot, './dist')
var entries = getEntry(srcDir + '/js/*.js')

function getEntry (entryPath) {
    var filename,
        entries = {};

    glob.sync(entryPath).forEach(function (file) {
        filename = path.basename(file, path.extname(file))
        entries[filename] = file;
    })

    return entries;
}

function createHtml () {
    var r = [], filename, conf;

    glob.sync(srcDir + '/*.html').forEach(function (file) {
        filename = path.basename(file, path.extname(file));

        conf = {
            template: 'html!' + file,
            filename: filename + '.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }

        if (filename in entries) {
            conf.inject = 'body';
            conf.chunks = [filename, 'vendor', 'manifest', 'bootstrap']
        }

        r.push(new HtmlWebpackPlugin(conf))
    })

    return r;
}

var conf = {
    entry: entries,

    output: {
        path: distDir,
        filename: '[name].js',
        publicPath: '/'
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: projectRoot,
                exclude: /node_modules/
            }
        ],

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

    eslint: {
        formatter: require('eslint-friendly-formatter') // https://github.com/royriojas/eslint-friendly-formatter
    },

    plugins: createHtml()
}

module.exports = conf;