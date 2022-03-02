module.exports = {
	name: 'pick',
	description: 'randomly picks an element from items',
	
	run: (bot, message, args) => {
		nItem = args.length;

		if(nItem == 0){
			message.channel.send("There's no item you dumdum");
			return;
		}

		radInt = Math.floor(Math.random() * nItem);
		message.channel.send(args[radInt]);
	}
};