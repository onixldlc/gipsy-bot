const { hotLoadCommands, hotLoadEvents } = require('../../utils/loader.js')

module.exports = {
	name: 'hotload',
	description: 'hotload command on the run',
    ownerOnly: true,
    hidden: true,
    
	run: (bot, message, args) => {
		hotLoadCommands(bot);
		message.channel.send("commands has been reloaded");
	}
}