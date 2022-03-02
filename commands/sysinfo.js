const { OUTPUT } = require("../preexistingOutput/sysinfoOutput");

module.exports = {
	name: 'sysinfo',
	description: 'for printing system info',
	hidden: false,
	checkOwner: true,
	run: (bot, message, args) => {
		message.channel.send("```\n"+OUTPUT+"\n```")
	}
};