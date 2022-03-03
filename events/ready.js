module.exports = {
	name: 'ready',
	once: false,
	execute: async (bot, message) => {
		console.log(`Ready! Logged in as ${bot.user.tag}`);
        bot.user.setActivity(`${bot.config.PREFIX}help`, { type: 'LISTENING' });
		await bot.application.commands.set(bot.tempSlashCommand);
	}
};