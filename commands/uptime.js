const { convertMiliSecToDate } = require("../utils/timeHandler")
module.exports = {
	name: 'uptime',
	description: 'check for bots uptime',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
		var timeInMilSec = bot.uptime
		message.channel.send(`\`\`\`\n ${convertMiliSecToDate(timeInMilSec)} \n\`\`\``)
	}
};