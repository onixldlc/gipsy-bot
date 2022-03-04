const fs = require('node:fs');
const { promisify } = require('node:util');
const { glob } = require('glob');

const globPromise = promisify(glob);

// set command to require its respective file recursively
async function hotLoadCommands (bot) {
	const commandFiles = await (await globPromise(`${process.cwd()}/commands/**/*.js`));
	commandFiles.map((value) => {
		delete require.cache[require.resolve(value)];
		const command = require(value);
		const splitted = value.split("/");
		const directory = splitted[splitted.length - 2];
		const properties = { directory, ...command };
		
		bot.commands.set(command.name, properties);
	})
}

// set command to requre its respective file recursively
async function hotLoadEvents (bot) {
	const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
    eventFiles.map((value) => {
		const event = require(value);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(bot, ...args));
		} else {
			bot.on(event.name, (...args) => event.execute(bot, ...args));
		}
	})
}

// havent tested this yet
async function hotLoadSlashCommands (bot) {
		const slashCommands = await globPromise(`${process.cwd()}/slashCommands/**/*.js`);
		const arrayOfSlashCommands = [];
		slashCommands.map((value) => {
			const file = require(value);
			if (!file?.name) return;
			bot.slashCommands.set(file.name, file);
	
			if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
			arrayOfSlashCommands.push(file);
		});

		// there should be a better implementation
		bot.on("ready", async () => {
			// Register for a single guild
			// await client.guilds.cache
			// 	.get("guildid")
			// 	.commands.set(arrayOfSlashCommands);
	
			// Register for all the guilds the bot is in
			await bot.application.commands.set(arrayOfSlashCommands);
		});
}

module.exports = { hotLoadCommands, hotLoadEvents, hotLoadSlashCommands };