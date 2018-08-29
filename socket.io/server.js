/*
var fs = require('fs');
*/
var path = '../node_modules';
var app = require(path + '/express')();
var http = require('http');
var port = 3001;

var server = http.createServer(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function(){ 
    console.log('listening on *:' + port);
});

var io = require('socket.io')(server);

var global_users = [];
var roomno = 0;
io.sockets.on('connection', function (socket) {
    roomno++;
    socket.join('room-'+ roomno);

    socket.on('join', function(data) {
        var exists = false;
        var length = global_users.length;
        if(length > 0) {
            for(var i = 0; i < length; i++) {
                var item = global_users[i];
                if(item.id === data.id) {
                    exists = true;
                    break;
                }
            }
        }

        if(!exists) {
            global_users.push(data);
        }

        io.sockets.in('room-'+ roomno).emit('is_exists', exists);
        
    });

    socket.on('get-user-online-list', function(data) {
        socket.broadcast.emit('set-user-online-list', global_users);
    });
    
    socket.on('check_exists', function(data) {
        var exists = false;
        var length = global_users.length;
        if(length > 0) {
            for(var i = 0; i < length; i++) {
                var item = global_users[i];
                if(item.id === data.id) {
                    exists = true;
                    break;
                }
            }
        }

        socket.broadcast.emit('is_exists', exists);
    });

    socket.on('leave', function(data) {
        var length = global_users.length;
        if(length > 0) {
            for(var i = 0; i < length; i++) {
                var item = global_users[i];
                if(item.id === data.id) {
                    global_users.splice(i, 1);
                    break;
                }
            }
        }

        socket.broadcast.emit('set-user-online-list', global_users);
    });

    socket.on('disconnect', function(){
        //console.log('user disconnected');
    });

    socket.on('add-message', function(msg){
        console.log(msg);
        socket.broadcast.emit('add_message_to_list', msg);
    });
});
