var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');

var app = express();

var port = process.env.PORT || 3000;

var awsHost = 'https://sdi630mga9.execute-api.us-east-1.amazonaws.com/v1';

// serve static html and js files
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json


app.post('/participants', function (req, res) {
  
    var options = {
      uri: awsHost + '/participants',
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


app.post('/participants/recognition', function (req, res) {
    var options = {
      uri: awsHost + '/participants/recognition',
      method: 'POST',
      json: req.body
    };
    var responsePayload = {};
    request.post(options, function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error('recognition call failed:', err);
      }
      //console.log('Upload successful!  Server responded with:', JSON.stringify(body, null, 5));
      
      /*
      the response will be an array of objects like this
       {
          "Similarity": 98.9478988647461,
          "Face": {
               "FaceId": "021d16d5-9024-4ff7-b08d-bd3a2f825d38",
               "BoundingBox": {
                    "Width": 0.2824519872665405,
                    "Height": 0.37660300731658936,
                    "Left": 0.5192310214042664,
                    "Top": 0.6490380167961121
               },
               "ImageId": "b26a05cb-951d-57d6-83f2-e4e7a727aefe",
               "ExternalImageId": "eyJuYW1lIjogIkdlcnZhc2lvIiwgImxhc3RuYW1lIjogIkFteSJ9",
               "Confidence": 99.99309539794922,
               "UserData": {
                    "name": "Gervasio",
                    "lastname": "Amy"
               }
          }
     },
      */
      console.log("body.length = " + body.length);
      if (body.length > 0) {
        responsePayload.similarity = body[0].Similarity;
        responsePayload.name = body[0].Face.UserData.name;
        responsePayload.lastname = body[0].Face.UserData.lastname;
      }
      res.json(responsePayload);
    });
  
});



app.listen(port, function () {
    
});

console.log('Server started! At http://localhost:' + port);


