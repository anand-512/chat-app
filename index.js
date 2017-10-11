var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// // Static files
// app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);

var usernames = {};

var rooms = ['Lobby'];

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);
    socket.on('addUser', function(username){
        //socket.broadcast.emit('joined', data);
        socket.username = username;
        socket.emit('setName', username);
        socket.room = 'Lobby';
        usernames[username] = username;
        socket.join('Lobby');
        socket.emit('updateChat', 'You have connected to Lobby');
        socket.broadcast.to('Lobby').emit('updateChat', username + ' has connected to this room');
        socket.emit('updateRooms', rooms, 'Lobby');
    });

    socket.on('create', function(room) {
        rooms.push(room);
        socket.emit('updateRooms', rooms, socket.room);
    });

    socket.on('switchRoom', function(newroom) {
        var oldroom;
        oldroom = socket.room;
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit('updateChat', 'you have connected to ' + newroom);
        socket.broadcast.to(oldroom).emit('updateChat', socket.username + ' has left this room');
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updateChat', socket.username + ' has joined this room');
        socket.emit('updateRooms', rooms, newroom);
    });



    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        //io.sockets.emit('chat', data);
        io.sockets["in"](socket.room).emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        //socket.broadcast.emit('typing', data);
        socket.broadcast.to(socket.room).emit('typing', data)
    });

    socket.on('left', function(data){
        socket.broadcast.to(socket.room).emit('left', data);
        delete usernames[socket.username];
        socket.leave(socket.room);
        //socket.broadcast.emit('left', data);
    });

});
