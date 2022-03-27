module.exports = {
	name: 'test',
	description: 'test command',
	type: 'CHAT_INPUT',
	options: [
		{
			// name: "name",
			// description: "desc",
			// required: true,
			// type: 3
		}
	],

	run: (bot, interaction) => {
		interaction.reply({content: 'hi'});
	}
};