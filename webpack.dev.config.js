const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist'),
		environment: {
			arrowFunction: false
		}
	},
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/i,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					}
				},
				exclude: /node_modules/,
			}
		]
	},
	devServer: {
		open: true,
		hot: true,
		writeToDisk: true,
	}
};
