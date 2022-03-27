const { hotLoadCommands, hotLoadSlashCommands} = require('../../utils/loader.js');

module.exports = {
	name: 'hotload',
	description: 'hotload command on the run',
	ownerOnly: true,
	hidden: true,
    
	run: (bot, message) => {
		hotLoadCommands(bot);
		hotLoadSlashCommands(bot);
		message.channel.send('commands has been reloaded');
	}
};