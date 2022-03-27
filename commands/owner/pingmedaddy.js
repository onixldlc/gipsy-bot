module.exports = {
	name: 'pingmedaddy',
	description: 'confirm ownership',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message) => {
		message.reply('Hello owner ( ͡° ͜ʖ ͡°)');
	}
};