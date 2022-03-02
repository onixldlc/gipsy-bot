const { evaluate } = require('mathjs')

module.exports = {
	name: 'mathfs',
	description: 'ngitung',
	hidden: false,
	checkOwner: false,
	run: (bot, message, args) => {
		message.channel.send(`${evaluate(args.join(""))}`)
	}
};