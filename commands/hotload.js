const { hotLoadCommands, hotLoadEvents } = require('../utils/loader.js')

module.exports = {
	name: 'hotload',
	description: 'hotload command and event on the run',
    ownerOnly: true,
    hidden: true,
    
	run: (bot, message, args) => {
		hotLoadCommands(bot);
        hotLoadEvents(bot);
		message.channel.send("commands has been reloaded");
	}
}