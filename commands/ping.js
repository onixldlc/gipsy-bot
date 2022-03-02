module.exports = {
	name: 'ping!',
	description: 'replies with "pong!"',
	
	run: (bot, message, args) => {
		message.reply('pong!');
	}
};