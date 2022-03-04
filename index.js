// get necessary packages
const fs = require('node:fs');
const { Client, Collection, Intents, Message, BitField } = require('discord.js');
const { hotLoadCommands, hotLoadEvent, hotLoadSlashCommand, hotLoadImageDatabase } = require('./utils/loadCommand.js')
const config = require('./config.json')

// create client instance
const bot = new Client({ intents : 32767 });

bot.config = config;
bot.commands = new Collection();
bot.slashCommands = new Collection();
bot.imgDb = new Collection();
bot.tempSlashCommand = [];
bot.musicQueue = [];
bot.connection;
// note for slash command ( you need to reinvite you bot everytime you added new slash command...
// hey look im not the one making the rule its them the discord |:)

// loads command
hotLoadImageDatabase(bot)

// loads command
hotLoadCommands(bot)

// loads slash commands
hotLoadSlashCommand(bot)

// reacts on event
hotLoadEvent(bot)

// login to discord with bot's token
bot.login(config.TOKEN);
