var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic('.'));
app.use(serveStatic('app'));
app.listen(5858);