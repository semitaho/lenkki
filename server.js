var express = require('express');

var app = express();
app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users

//app.use(express.staticProvider(__dirname + '/app'));

app.get('/', function(req, res) {
      console.log('dooap some shittaaa');
      res.sendfile('./index.html'); // load our public/index.html file
    });

app.listen(8080);
console.log('testing framework...');