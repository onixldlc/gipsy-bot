module.exports = {
	name: 'notBotCreatorPermitError',
	description: '',
	hidden: true,
	checkOwner: false,
	run: (bot, message, args) => {
		message.reply("sorry you are not the owner of this bot i cant let you see it :/")
	}
};