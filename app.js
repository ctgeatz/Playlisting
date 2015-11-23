var express = require("express");
var app = express();

var path = require("path");
var publicPath = path.join(__dirname, "public");
var staticHandler = express.static(publicPath);


app.use(staticHandler);

var port = 8080;
app.listen(port);
