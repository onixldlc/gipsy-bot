module.exports = {
	name: 'ping!',
	description: 'replies with "pong!"',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
		message.reply('pong!');
	}
};