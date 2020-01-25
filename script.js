const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message_container');
const messageForm = document.getElementById('send_container');
const messageInput = document.getElementById('message_input')

const name = prompt('what is your name');
appendMessage('you have been joined to the chat');
socket.emit('new_user', name);

socket.on('chat_message', data => {
	appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user_connected', name => {
	appendMessage([`${name} is connected`]);
});

socket.on('user_disconnected', name => {
	appendMessage([`${name} have been leave the chat`]);
});

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	const message = messageInput.value;
	if(message.length != 0){
		appendMessage(`you: ${message}`);
		socket.emit('send_chat_message', message);
		messageInput.value = '';
	}
});

function appendMessage(message){
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageContainer.append(messageElement);
}