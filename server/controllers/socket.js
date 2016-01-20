module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log('connected ' + socket.user);
        console.log(socket);
        socket.on('new issue', function(data) {
            socket.broadcast.emit('new issue', {
                username: socket.userId,
                message: data
            })
        });
        socket.on('disconnect', function(data) {
            console.log('disconnected ' + socket.userId);
        });
    });
}