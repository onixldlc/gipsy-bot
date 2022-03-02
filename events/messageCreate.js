module.exports = (bot, message) => {
    // Ignore all bots
    if (message.author.bot) return;
  
        // for multiline command
	// queueCommand = message.content.split('\n');
	// for (cmd in queueCommand){
	//     message.reply(queueCommand[cmd]);
	// }

    // Ignore messages not starting with the prefix (in config.json)
    if (!msg.content.startsWith(bot.config.prefix)) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = bot.commands.get(commandName);
  
    // If that command doesn't exist, tell so and exit.
    if (!cmd) {
        message.reply(`"${commandName}" is not a command`);
		return;
    }
  
    // Run the command
    try{
        cmd.run(bot, message, args);
    } catch (error) {
        conosle.error(error);
    }
  };