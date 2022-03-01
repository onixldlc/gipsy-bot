// get necessary packages
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

// prefix command 
bot.on('messageCreate', async msg => {
    if(msg.author.bot) return; // ignore bot
    if(msg.content.startsWith(PREFIX)){
        
    }
});

// slash command    
bot.on('interactionCreate', async interaction => {
    console.log('im here');
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply({ content : 'server info', ephemeral : true });
    } else if (commandName === 'user') {
        await interaction.reply({ content : 'user info', ephemeral : true });
    }
});

// login to discord with bot's token
bot.login(TOKEN);