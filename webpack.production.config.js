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
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		// there is no HTML file!!
		new HtmlWebpackPlugin({
			title: 'GIF the News',
			filename: 'index.html'
		})
	]
}
