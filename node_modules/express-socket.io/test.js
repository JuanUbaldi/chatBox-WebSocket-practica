// NOTE: express is not included in the package.json 
var express = require('express'),
    app     = express(),
    port    = 3000,
    ioProm  = require('./socket.js');

// Setup the server
var server = ioProm.init(app);

// Use a promise to set up the io part once the socket is created.
ioProm.then(function(io) {
    var nsp = io.of('/api');

    nsp.on('connection', function(socket) {
        console.log('Connected!');
        socket.on('test', function(data) {
            console.log('Got data from test', data);
            socket.emit('sendTest', data);
        });
    });
});

// server.listen NOT app.listen
server.listen(port, function() {
    console.log('Server Listening on port', port);
});