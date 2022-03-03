module.exports = {
	name: 'help',
	description: 'lists all command name and description',
	ownerOnly: false,
    hidden: true,

	run: (bot, message, args) => {
        message.reply('help is coming but not so soon :)');
	}
};