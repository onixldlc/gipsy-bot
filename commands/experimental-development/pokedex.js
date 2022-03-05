const axios = require('axios');

module.exports = {
	name: 'poke',
	aliases: [],
	description: 'get pokemon info from pokeAPI',
	ownerOnly: false,
	hidden: false,
	
	run: (bot, message, args) => {
		if (args[0] === undefined) {
			message.reply('jangan lupa nama pokemonnya nya bwang');
			return;
		}

		console.log(args);
            
		let url = `https://pokeapi.co/api/v2/pokemon/${args[0]}/`;
		message.channel.send(url);
		axios
			.get(url)
			.then((res) => {
				const img = res.data.sprites.other['official-artwork'].front_default;
				message.channel.send(img);
				console.log('success');
			})
			.catch((error) => {
				console.error(error.response.data);
				console.error(error.response.status);
				console.error(error.response.headers);

				if (error.response.status == '404') {
					message.reply(`${args[0]} is not a real pokemon you dumdum`);
				} else {
					message.reply('uh oh, sumting wong occured');
				}
			});
	}
};