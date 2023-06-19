var http     = require('http').Server,
    prom     = require('deferred')(),
    socketIo = require('socket.io'),
    io;

// Return a promise to get access to the socket once the server is setup
module.exports = prom.promise;

// Initialize a new server for the socket using an express app
module.exports.init = function(app) {
    var server = http(app);
    if (io) {
        return prom.promise;
    }
    io = socketIo(server);
    prom.resolve(io);
    return server;
};