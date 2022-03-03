const fs = require('node:fs');
module.exports={
	hotLoadCommands:(bot)=>{
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			delete require.cache[require.resolve(`../commands/${file}`)];
			const command = require(`../commands/${file}`);
			bot.commands.set(command.name, command);
		}
	},
	hotLoadEvent:(bot)=>{
		const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
		for (const file of eventFiles) {
			const event = require(`../events/${file}`);
			if (event.once) {
				bot.once(event.name, (ret)=>event.execute(bot, ret) );
			} else {
				bot.on(event.name, (ret)=>event.execute(bot, ret) );
			}
		}
	},
	hotLoadSlashCommand:(bot)=>{
		const slashCommandFiles = fs.readdirSync('./slashCommand').filter(file => file.endsWith('.js'));
		bot.tempSlashCommand = []
		for (const file of slashCommandFiles) {
			delete require.cache[require.resolve(`../slashCommand/${file}`)];
			const slashCommand = require(`../slashCommand/${file}`);

			bot.slashCommands.set(slashCommand.name, slashCommand)
			
			bot.tempSlashCommand.push(slashCommand);
		}
	},
	hotLoadImageDatabase:(bot)=>{
		const imgLinkFiles = fs.readdirSync('./links').filter(file => file.endsWith('.js'));
		for (const file of imgLinkFiles) {
			delete require.cache[require.resolve(`../links/${file}`)];
			const img = require(`../links/${file}`);
			bot.imgDb.set(img.name, img)
		}
	}
}