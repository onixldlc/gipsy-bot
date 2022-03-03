module.exports = {
	name: 'printroles',
	// aliases: ['alias1', 'alias2'],
	description: 'command desc',
	ownerOnly: true,
    hidden: true,
	
	run: (bot, message, args) => {
		message.guild.roles.cache.forEach(role => message.channel.send(role.name, role.id));
	}
};