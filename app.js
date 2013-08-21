var fs = require('fs');
var express = require('express');
var app = express();

app.use('/', express.static(__dirname));

app.listen(process.env.PORT || 5000)
console.log('server started successfully');
