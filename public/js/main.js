'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

var jpegUrl;

var takePhotoBtn = $("#takePhotoBtn");
takePhotoBtn.on("click", function() {
   jpegUrl = takeSnapshot();
});

var registerBtn = $("#registerBtn");
registerBtn.on("click", function() {
    var uid = $('#uid').val();
    register({
        uid: uid,
        lastname: "name",
        encoding: jpegUrl
    })
});

function takeSnapshot() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    var jpegUrl = canvas.toDataURL("image/jpeg");
    return jpegUrl;
}

function register(req) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/participants",
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        data: JSON.stringify(req),
        success: fillResponse,
        error: fillResponse
}   );
};

function fillResponse(res, text, jqXHR) {
    $("#response").text(JSON.stringify(res));
}


var constraints = {
    audio: false,
    video: true
};

function handleSuccess(stream) {
    window.stream = stream; // make stream available to browser console
    video.srcObject = stream;
}

function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
