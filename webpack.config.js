var path = require('path');
var webpack = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postcssmixins = require('postcss-mixins');
var postcssColorAlpha = require('postcss-color-alpha');
var stripInlineComments = require('postcss-strip-inline-comments');

module.exports = {
	devtool: 'eval',
	entry: [
		//	'babel-polyfill',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'src')
			},
			{
                test: /\.scss$/,
                include: /src/,
				loader: "style-loader!css-loader!postcss-loader"
            },
		]
	},
    postcss: function () {
        return [postcssmixins, stripInlineComments, precss, postcssColorAlpha, autoprefixer];
    }
};
