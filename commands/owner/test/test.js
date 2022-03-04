module.exports = {
	name: 'test',
	description: 'to test stuff for development purposes',
	ownerOnly: true,
    hidden: true,
	
	run: (bot, message, args) => {
		message.channel.send('success');
	}
};