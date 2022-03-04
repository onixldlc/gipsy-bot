function runCmdInBatch(bot, message){
	var inputQueue=message.content.split("\n");
	for(userCmd of inputQueue){
		console.log(userCmd)
		runCommand(bot, message, userCmd)
	}
}

function runCommand(bot, message, inputs){
	if (!inputs.startsWith(bot.config.PREFIX)) return;
	const args = inputs.slice(bot.config.PREFIX.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const cmd = bot.commands.get(commandName);
	const errorCmd = bot.commands.get("notBotCreatorPermitError")

	if (!cmd) {return message.reply(`"${commandName}" is not a command`);}

	if(cmd.checkOwner && (message.author.id != bot.config.ownerId) ){
		return bot.commands.get("notBotCreatorPermitError").run(bot, message, args);
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

		runCmdInBatch(bot, message)
	}
};