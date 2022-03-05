const axios = require('axios');

module.exports = {
	name: 'poke',
	aliases: [],
	description: 'get pokemon info from pokeAPI',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
		if (!args) {
			message.reply('jangan lupa args nya bwang');
			return;
		}

		if (args[0] === 'ryan'){
			message.reply('https://tenor.com/view/among-us-twerk-thicc-among-us-twerk-funny-among-us-gif-20511920');
			return;
		}
            
		let url = `https://pokeapi.co/api/v2/pokemon/${args[0]}/`;
		message.channel.send(url);
		axios
			.get(url)
			.then((res) => {
				const img = res.data.sprites.other['official-artwork'].front_default;
				message.channel.send(img);
			})
			.catch((error) => {
				message.channel.send(error.message);
			});
	}
};