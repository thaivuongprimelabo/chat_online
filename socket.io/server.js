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

const CODE_OK = '0000';
const CODE_EXISTS = '0001';

io.sockets.on('connection', function (socket) {
    //roomno++;
    //socket.join('room-'+ roomno);
    //console.log(roomno);

    socket.on('create', function(data) {
        console.log('create room: ' + data);
        socket.join(data);
        console.log(io.sockets.adapter.rooms[data].length);
    });

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
            console.log('join user: ' + data.id);
            global_users.push(data);
        }
        
    });

    socket.on('get-user-online-list', function(data) {
        //socket.broadcast.emit('set-user-online-list', global_users);
        console.log('get-user-online-list', data.roomId);
        var response = {
            code : CODE_OK,
            data : global_users
        }
        io.sockets.in(data.roomId).emit('set-user-online-list', response);
    });
    
    socket.on('check-exists', function(data) {
        var response = {
            code : CODE_OK,
            data : data
        }
        var length = global_users.length;
        if(length > 0) {
            for(var i = 0; i < length; i++) {
                var item = global_users[i];
                if(item.email === data.email) {
                    response.code = CODE_EXISTS;
                    response.data = null;
                    break;
                }
            }
        }
        
        io.sockets.in(data.roomId).emit('is-exists', response);
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
        console.log('leave: ' + data.id);
        socket.broadcast.emit('set-user-online-list', global_users);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('add-message', function(msg){
        console.log(msg);
        socket.broadcast.emit('add_message_to_list', msg);
    });
});
