const {hotLoadCommands} = require("../utils/loadCommand")
module.exports = {
	name: 'reload',
	description: 'reload all the command',
	hidden: false,
	checkOwner: true,
	run: (bot, message, args) => {
		hotLoadCommands(bot)
		message.reply("commands has been reloaded")
	}
};