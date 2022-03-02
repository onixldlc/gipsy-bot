module.exports = {
    name: 'messageCreate',
    execute: (bot, message) => {
        // Ignore all bots
        //if (message.author.bot) return;
        console.log("im here");
		// console.log(bot ,message)
        
            // for multiline command
        // queueCommand = message.content.split('\n');
        // for (cmd in queueCommand){
        //     message.reply(queueCommand[cmd]);
        // }

        // Ignore messages not starting with the prefix (in config.json)
		// console.log(message.content)
		// console.log(message.content[0],message.content[1])
		// console.log(message.content.startsWith("["))
		// console.log(bot.config.prefix)
		
        if (!message.content.startsWith(bot.config.PREFIX)) return;

        // Our standard argument/command name definition.
        const args = message.content.slice(" ").trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

		console.log(commandName, args)

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
	}
};