// @ts-check
const { Client, Message } = require("discord.js");
try{
	const { OUTPUT } = require("../preexistingOutput/sysinfoOutput");
}
catch(err){
	const OUTPUT = "null (you have not created file for this command)";
}


module.exports = {
	name: 'sysinfo',
	description: 'for printing system info',
	hidden: false,
	checkOwner: true,
	/**
	 *
	 * @param {Client} bot
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: (bot, message, args) => {
		// return sendAttachedEphemeral(message, "./preexistingOutput/test.txt")
		return message.channel.send({content: "```\n"+OUTPUT+"\n```"})
	}
};