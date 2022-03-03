function runCmdInBatch(bot, message){
	const inputQueue = message.content.split("\n");
	for (userCmd of inputQueue){
		runCommand(bot, message, userCmd)
	}
}

function runCommand(bot, message, input){
	const args = input.slice(bot.config.PREFIX.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	const command = bot.commands.get(cmd) || bot.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

	if (!command) {
		message.reply(`"${cmd}" is not a command`);
		return;
	}

	if(command.ownerOnly && (message.author.id != bot.config.ownerId)){
		message.reply('You\'re not the owner you dumdum');
		return;
	}

	try{
		command.run(bot, message, args);
	}catch (error) {
		console.error(error);
	}
}

module.exports = {
	name: 'messageCreate',
	execute: (bot, message) => {
		// no bots, no !guild, no !prefix
		if (
			message.author.bot ||
			!message.guild ||
			!message.content.startsWith(bot.config.PREFIX)
		) 
			return;

        // Run Command
		runCmdInBatch(bot, message)
	}
};