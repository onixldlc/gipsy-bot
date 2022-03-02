// get necessary packages
const fs = require('node:fs');
const { Client, Collection, Intents, Message, BitField } = require('discord.js');
const config = require('./config.json')

// create client instance
const bot = new Client({ intents : 
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

bot.config = config;
bot.commands = new Collection();

// reacts on event
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args));
		} else {
			bot.on(event.name, (...args) => event.execute(...args));
		}
	}
}

// loads command
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    console.log(`Attempting to load command ${commandName}`)
    bot.commands.set(command.name, command);
}

//dynamic slash command execution
bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

    // ignore if command doesnt exist
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//dynamic prefix command execution 
bot.on('messageCreate', async msg =>{
    if (msg.author.bot) return;
	if (!msg.content.startsWith(PREFIX)) return;

		// for multiline command
	// queueCommand = msg.content.split('\n');
	// for (cmd in queueCommand){
	// 	msg.reply(queueCommand[cmd]);
	// }

	const args = msg.content.slice(PREFIX.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();
	const command = bot.commands.get(commandName);
	
	if(!command){
		msg.reply(`"${commandName}" is not a command`);
		return;
	};

	try {
		command.execute(msg, args);
	} catch (error) {
		console.error(error);
	}
});


// login to discord with bot's token
bot.login(config.TOKEN);
