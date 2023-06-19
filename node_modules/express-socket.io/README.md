# A node module to make it easier to attach Socket.io to Express apps

### Normal Express Setup
```
var express = require('express');
var app = express();
var port = process.env.port || 3000;

// ... app attachments

app.listen(port, function() {
    console.log('Server listening on port: ', port);
});

```

### With express-socket.io
```
var express = require('express');
var app     = express();
var port = process.env.port || 3000;
var ioProm  = require('express-socket.io');
var server  = ioProm.init(app);

// ... app attachments

server.listen(port, function() {
    console.log('Server listening on port: ', port);
});
```

### Example of how to use express-socket.io
```
var ioProm = require('express-socket.io');

ioProm.then(function(io) {
    // io is the io object connected to the server.
    
    io.on('connection', function(socket) {
        console.log('Connected!');
        socket.on('incoming', function(data) {
            // Do stuff with data

            // Send data back to different listener
            socket.emit('outgoing', data);
        });
    });
});
```
For More on how to use socket-io look here [socket-io](http://socket.io/docs/)