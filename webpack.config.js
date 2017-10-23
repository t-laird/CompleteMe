var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: "./lib/index.js",
  },
  target: 'web',
  output: {
    path: __dirname,
    filename: "[name].bundle.js",
    libraryTarget: "var",
    library: "Foo"
  },
  module: {
    noParse: [ /.*(pixi\.js).*/ ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel'
      },
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
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
  })
  ],
  externals: {
    "jquery": "jQuery",
    "bundle!jquery": "bundledJQuery"
  }
};
