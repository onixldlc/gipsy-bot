module.exports = {
    name: 'messageCreate',
    execute(bot, message) {
        // Ignore all bots
        if (message.author.bot) return;
        
        // for multiline command
        queueCommand = message.content.split('\n');

        // process each command
        for (item in queueCommand){
            request = queueCommand[item];

            // ignore messages not starting with the prefix (in config.json)
            if (!request.startsWith(bot.config.PREFIX)) continue;

            // our standard argument/command name definition.
            const args = request.slice(bot.config.PREFIX.length).trim().split(/ +/g);
            const commandName = args.shift().toLowerCase();

            // grab the command data from the client.commands 
            const cmd = bot.commands.get(commandName);

            // if that command doesn't exist, tell so and skip loop
            if (!cmd) {
                message.reply(`"${commandName}" is not a command`);
                continue;
            }

            // try to run command
            try{
                cmd.run(bot, message, args);
            } catch (error) {
                conosle.error(error);
            }
        }
    }
};