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
			bot.on(event.name, event.execute);
		}
	}
}

// loads command
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    console.log(`Attempting to load command ${command.name}`)
    bot.commands.set(command.name, command);
}

// login to discord with bot's token
bot.login(config.TOKEN);
