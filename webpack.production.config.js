var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcssmixins = require('postcss-mixins');
var postcssColorAlpha = require('postcss-color-alpha');
var stripInlineComments = require('postcss-strip-inline-comments');


module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.min.js'
	},
	module: {
		loaders: loaders
	},
    postcss: function () {
        return [postcssmixins, stripInlineComments, precss, postcssColorAlpha, autoprefixer];
    },
	plugins: [
		// need this guy to make react build the production version, instead of just minifying the dev version
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new HtmlWebpackPlugin({
			title: 'GIF The News',
			template: './src/index.ejs',
			filename: 'index.html'
		})
	]
}
