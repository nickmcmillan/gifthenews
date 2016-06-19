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
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: 'GIF The News - development',
			template: './src/index.ejs',
			filename: 'index.html'
		})
	],
	module: {
		loaders: loaders
	},
    postcss: function () {
        return [postcssmixins, stripInlineComments, precss, postcssColorAlpha, autoprefixer];
    }
}
