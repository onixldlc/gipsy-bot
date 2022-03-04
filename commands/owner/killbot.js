module.exports = {
	name: 'killbot',
	description: 'kills bot',
	ownerOnly: true,
    hidden: true,
	
	run: (bot, message, args) => {
        message.channel.send('Oof!').then(bot.destroy);
	}
};