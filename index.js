// get necessary packages
const fs = require('node:fs');
const { Client, Collection, Intents, Message } = require('discord.js');
const { TOKEN, PREFIX } = require('./config.json');

// create client instance
const bot = new Client({ intents : 
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// read event and event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}

// commands collection
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
	// with the key as the command name and the value as the exported module
    bot.commands.set(command.data.name, command);
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

    // continue developing pls
});


// login to discord with bot's token
bot.login(TOKEN);
