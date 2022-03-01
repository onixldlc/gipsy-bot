// get necessary packages
const fs = require('node:fs');
const { Client, Intents } = require('discord.js');
const { token, prefix } = require('./config.json');

// create client instance
const bot = new Client({ intents : 
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// when client is ready, run this code (only once)
bot.once('ready', () => {
    console.log(`Bot logged in successfully`);
});

// command collection
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
	// with the key as the command name and the value as the exported module
    bot.commands.set(command.data.name, command);
}

// login to discord with bot's token
bot.login(TOKEN);