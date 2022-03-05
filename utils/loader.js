const { promisify } = require('node:util');
const { glob } = require('glob');

const globPromise = promisify(glob);

module.exports = {
	// set commands to require its respective file recursively
	hotLoadCommands: async (bot) => {
		const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
		commandFiles.map((value) => {
			delete require.cache[require.resolve(value)];
			const command = require(value);
			const individualFolder = value.split('/');
			const folderindex = individualFolder.length - 2;
			const folder = individualFolder[folderindex];
			const properties = { directory: folder, ...command };
		
			bot.commands.set(command.name, properties);
		});
	},
	// set events to requre its respective file recursively
	hotLoadEvents: async (bot) => {
		const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
		eventFiles.map((value) => {
			const event = require(value);
			if (event.once) {
				bot.once(event.name, (...args) => { event.execute(bot, ...args); });
			} else {
				bot.on(event.name, (...args) => { event.execute(bot, ...args); });
			}
		});
	},
	// set slash commands to require its respective file recursively
	hotLoadSlashCommands: async (bot) => {
		const slashCommandsFiles = await globPromise(`${process.cwd()}/slashCommands/**/*.js`);
		const arrayOfSlashCommands = [];
		slashCommandsFiles.map((value) => {
			const slashCommand = require(value);
			if (!slashCommand?.name) return;
			bot.slashCommands.set(slashCommand.name, slashCommand);
			
			// not quite understand what this does yet
			if ([ 'MESSAGE', 'USER' ].includes(slashCommand.type)) delete slashCommand.description;
			arrayOfSlashCommands.push(slashCommand);
		});
	}
};