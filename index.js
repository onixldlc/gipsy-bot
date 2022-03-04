// get necessary packages
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { hotLoadCommands, hotLoadEvents } = require('./utils/loader.js');
const config = require('./config.json');

// create client instance
const bot = new Client({ intents : 
    [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
});

bot.config = config;
bot.commands = new Collection();

// reacts on event
hotLoadEvents(bot);

// loads command
hotLoadCommands(bot);

// login to discord with bot's token
bot.login(config.TOKEN);