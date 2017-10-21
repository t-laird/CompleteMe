const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    noParse: [ /.*(pixi\.js).*/ ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      {	test: /\.json$/, include: path.join(__dirname,'node_modules', 'pixi.js'), loader: 'json',  },
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel'
			}
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'transform/cacheable?brfs',
        include: /node_modules\/pixi\.js/
      }
    ]
  },
  resolve: {
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    extensions: ['', '.js', '.json', '.css']
  },
  node: {
    fs: 'empty'
  }
};
