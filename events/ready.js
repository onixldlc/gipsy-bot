module.exports = {
	name: 'ready',
	once: true,
	execute: (bot, message) => {
		console.log(`Ready! Logged in as ${bot.user.tag}`);
        bot.user.setActivity(`${bot.config.PREFIX}help`, { type: 'LISTENING' });
	}
};