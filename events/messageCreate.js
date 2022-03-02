function runCmdInBatch(bot, message){
	const inputQueue = message.content.split("\n");
	for (userCmd of inputQueue){
		runCommand(bot, message, userCmd)
	}
}

function runCommand(bot, message, input){
	const args = input.slice(bot.config.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const cmd = bot.commands.get(commandName);
	const permitError = bot.commands.get("notBotCreatorPermitError");

	if (!cmd) {
		message.reply(`"${commandName}" is not a command`);
		return;
	}

	if(cmd.ownerOnly && (message.author.id != bot.config.ownerId)){
		message.reply('You\'re not the owner you dumdum');
		return;
	}

	try{
		cmd.run(bot, message, args);
	}catch (error) {
		console.error(error);
	}
}

module.exports = {
	name: 'messageCreate',
	execute: (bot, message) => {
		// Ignore all bots
		if (message.author.bot) return;

		// Ignore messages not starting with the prefix (in config.json)
		if (!message.content.startsWith(bot.config.PREFIX)) return;

        // Run Command
		runCmdInBatch(bot, message)
	}
};