/*
var fs = require('fs');
*/
var path = '../reactjs/node_modules';
var app = require(path + '/express')();
var request = require(path + '/request');
var https = require('http');
var port = 3001;

var server = require('http').createServer(app);
var tutor_socket_ids = {};
var online_tutors = {};
/*
server.listen(port || 3001,"0.0.0.0", function(){
  console.log('\033[96mlistening on localhost:3001 \033[39m');
});
*/
/*
TODO: session timeout not have solution for realtime emit
*/
server.listen(port, "0.0.0.0", function () {
    console.log('Server listening on host:' + port);
});

var io = require(path + '/socket.io')(server);
io.online_tutors = online_tutors;
io.sockets.on('connection', function (socket) {
    //console.log('|- server.js: connection');
    // console.log(socket);
    socket.on('join', function (data) {
        socket.global_online_id = data;
        socket.join(data);
    });

    socket.on('disconnect', function () {
        //console.log('|- server.js: disconnect');
        var socket_id = socket.id;
        if(offline(socket_id, online_tutors, tutor_socket_ids)==true){
            socket.broadcast.emit('update_online_tutors', online_tutors);
        }
    });

    socket.on('reconnect', function () {
        //console.log('|- server.js: reconnect');
    });
});
