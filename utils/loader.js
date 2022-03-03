const fs = require('node:fs');
const { promisify } = require('node:util');
const { glob } = require('glob');

const globPromise = promisify(glob);

// set command to require its respective file recursively
async function hotLoadCommands (bot) {
	const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
	commandFiles.map((value) => {
		delete require.cache[require.resolve(value)];
		const command = require(value);
		const splitted = value.split("/");
		const directory = splitted[splitted.length - 2];
		const properties = { directory, ...command };
		
		bot.commands.set(command.name, properties);
	})
}


async function hotLoadEvents (bot) {
	const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => {
		const event = require(value);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(bot, ...args));
		} else {
			bot.on(event.name, (...args) => event.execute(bot, ...args));
		}
	})
}

module.exports = { hotLoadCommands, hotLoadEvents };