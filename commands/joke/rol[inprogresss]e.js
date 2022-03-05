module.exports = {
	name: 'role',
	aliases: ['alias1', 'alias2'],
	description: 'command desc',
	ownerOnly: false,
    hidden: true,
	
	run: (bot, message, args) => {
		let id, member;
		let responseArr = [
			('chad', 'Hi **Chad**' ,'https://tenor.com/view/gigachad-chad-gif-20773266'),
			('beta-male', 'you filthy **beta-male**', 'https://tenor.com/view/fraz-bradford-meme-world-of-tanks-albania-gif-20568566'),
			('bros', 'Hello **Bros**', 'https://tenor.com/view/hulk-hogan-nodding-nod-yes-yup-gif-13973219')
		]
		
		if (args) {
			id = args[0].slice(3, args[0].length-1);
			member = message.guild.members.cache.get(id);
		}		
	}
};