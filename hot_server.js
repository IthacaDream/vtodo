var webpack = require('webpack');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var config = require('./webpack.config.js');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');

var port = 3000;

console.log("environment:", process.env.NODE_ENV);

var compiler = webpack(config);
var app = new (express)();

app.use(webpackDevMiddleware(compiler,
                           {noInfo: false,
                            hot: true,
                            quiet: true,
                            contentBase: './public',
                            headers: {'Access-Control-Allow-Origin': '*'},
                            stats: {colors: true},
                            publicPath: config.output.path }));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, './public/static')));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open http://127.0.0.1:%s/", port, port);
  }
})
