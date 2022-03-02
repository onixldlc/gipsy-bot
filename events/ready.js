const { PREFIX } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(bot) {
		console.log(`Ready! Logged in as ${bot.user.tag}`);
        bot.user.setActivity(`${PREFIX}help`, { type: 'LISTENING' });
	},
};