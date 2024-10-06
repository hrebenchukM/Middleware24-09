
var express = require('express');
var fs = require('fs');

var app = express();

var path = 'logger.txt';

app.use(function(request, response,next){
    var data = `Address : ${request.ip}; Time: ${new Date().toLocaleString()}; URL : ${request.url}\n`;

    fs.appendFile(path, data, function(err){
        console.log('data wrote');
    });
    next();
});

app.get('/', function(request, response){
    console.log('Main handler');
    response.write("hello");
    response.end();
});

app.listen(8080, function(){
    console.log('Server start')
});