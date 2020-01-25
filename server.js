const io = require('socket.io')(3000);
const users = {};

io.on('connection', socket => {
	socket.on('new_user', name =>{
		users[socket.id] = name;
		socket.broadcast.emit('user_connected', name);
	});
	
	socket.on('send_chat_message', message =>{
		socket.broadcast.emit('chat_message', {
			message: message,
			name: users[socket.id]
		});
	});

	socket.on('disconnect', () =>{
		socket.broadcast.emit('user_disconnected', users[socket.id]);
		delete users[socket.id];
	});
});