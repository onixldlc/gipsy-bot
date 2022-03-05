module.exports = {
	name: 'ping',
	description: 'checks Bot and API ping',
	ownerOnly: false,
	hidden: true,
	
	run: (bot, message) => {
		const botp = Date.now() - message.createdTimestamp;
		const APIp = bot.ws.ping;
		message.channel.send(`\`\`\`Bot latency: ${botp}ms, API latency: ${APIp}ms\`\`\``);
	}
};