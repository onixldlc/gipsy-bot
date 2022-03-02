module.exports = {
	name: 'ping!',
	description: 'replies with "pong!"',
	ownerOnly: true,
    hidden: true,
	
	run: (bot, message, args) => {
		message.reply('Hello owner ( ͡° ͜ʖ ͡°)');
	}
};