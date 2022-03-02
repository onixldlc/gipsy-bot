module.exports = {
	name: 'randompick',
	description: 'to pick random element from suggested array',
	
	run: (bot, message, args) => {
		nItem = args.length;

		if(nItem == 0){
			message.channel.send("there is no item you dumdum");
			return;
		}

		radInt = Math.floor(Math.random() * nItem);
		message.channel.send(args[radInt]);
	}
};