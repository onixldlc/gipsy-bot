// @ts-check
const { Client, Message } = require("discord.js");
const { OUTPUT } = require("../preexistingOutput/sysinfoOutput");

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