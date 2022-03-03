module.exports = {
	name: 'role',
	aliases: ['alias1', 'alias2'],
	description: 'command desc',
	ownerOnly: false,
    hidden: true,
	
	run: (bot, message, args) => {
		const id = args[0].slice(3, args[0].length-1);
		const member = message.guild.members.cache.get(id);

		if(member.roles.cache.some(role => role.name === 'Chad')){
			message.reply('**Hi Chad**');
			message.channel.send('https://tenor.com/view/gigachad-chad-gif-20773266');
		} else if (member.roles.cache.some(role => role.name === 'beta-male')){
			message.channel.send('**filthy beta-male**');
			message.channel.send('https://tenor.com/view/fraz-bradford-meme-world-of-tanks-albania-gif-20568566');
		}
	}
};