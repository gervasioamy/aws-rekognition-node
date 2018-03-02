var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

var app = express();

var port = process.env.PORT || 3000;

var host = 'http://localhost:8080';

// serve static html and js files
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json


app.post('/participants', function (req, res) {

    var options = {
      uri: host + '/v1/services/face_recognition/identities/',
      method: 'POST',
      json: req.body
    };
    request(options, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('recognition call failed:', err);
      }
      console.log('Upload participant successful!  Server responded with:', body);
    });
});


app.listen(port, function () {

});

console.log('Server started! At http://localhost:' + port);
