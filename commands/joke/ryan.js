module.exports = {
	name: 'ryan',
	aliases: ['toni', 'rapi', 'fadhil', 'zidane'],
	description: 'joke command for ryan',
	ownerOnly: false,
    hidden: true,
	
	run: (bot, message, args) => {
		const cargs = message.content.trim().slice(bot.config.PREFIX.length).split(/ +/g);
		const ccmd = cargs.shift().toLowerCase();
		

		if(ccmd == 'ryan')
			message.reply('https://tenor.com/view/among-us-twerk-thicc-among-us-twerk-funny-among-us-gif-20511920');
		else
			message.reply('https://tenor.com/view/gigachad-chad-gif-20773266');
	}
};