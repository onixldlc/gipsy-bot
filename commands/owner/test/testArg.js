module.exports = {
	name: 'testargs',
	// aliases: ['alias1', 'alias2'],
	description: 'command desc',
	ownerOnly: true,
    hidden: true,
	
	run: (bot, message, args) => {
		const id = args[0].slice(3,args[0].length-1);
		message.channel.send(id);
	}
};