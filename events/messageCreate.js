function runCmdInBatch(bot, message){
	var inputQueue=message.content.split("\n");
	for(userCmd of inputQueue){
		runCommand(bot, message, userCmd)
	}
}

function runCommand(bot, message, inputs){
	const args = inputs.slice(bot.config.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const cmd = bot.commands.get(commandName);
	const errorCmd = bot.commands.get("notBotCreatorPermitError")

	if (!cmd) {
		message.reply(`"${commandName}" is not a command`);
		return;
	}

	if(cmd.checkOwner && (message.author.id != bot.config.ownerId) ){
		bot.commands.get("notBotCreatorPermitError").run(bot, message, args);
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

		runCmdInBatch(bot, message)
	}
};