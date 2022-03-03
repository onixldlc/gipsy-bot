const fs = require('node:fs');
const { promisify } = require('node:util');
const { glob } = require('glob');

const globPromise = promisify(glob);

// set command to require its respective file recursively
async function hotLoadCommands (bot) {
	const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split("/");
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			bot.commands.set(file.name, properties);
		}
	})
}


function hotLoadEvents (bot) {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(bot, ...args));
		} else {
			bot.on(event.name, (...args) => event.execute(bot, ...args));
		}
	}
}

module.exports = { hotLoadCommands, hotLoadEvents };