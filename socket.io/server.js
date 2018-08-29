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

io.sockets.on('connection', function (socket) {

    socket.on('join', function(data) {

        global_users.push(data);
        
        socket.broadcast.emit('add_user_online', global_users);
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

        socket.broadcast.emit('add_user_online', global_users);
    });

    socket.on('disconnect', function(){
        //console.log('user disconnected');
    });

    socket.on('add-message', function(msg){
        console.log(msg);
        socket.broadcast.emit('add_message_to_list', msg);
    });
});
