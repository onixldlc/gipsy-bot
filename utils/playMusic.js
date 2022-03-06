const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');

module.exports={
	connectVoice: async (bot, message) => {
		bot.voiceConnection = await joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator
		});
	},

	musicStart: async (bot, message) => {
		const player = createAudioPlayer();

		try {
			var music = bot.musicQueue[0];
			await player.play(getResource(music.url));

			player.on('error', (error) => {
				message.channel.send('something went wrong!');
				console.error(error.message);
			});

			player.addListener('stateChange', async (oldOne, newOne) => {
				if (newOne.status == 'idle') {
					message.channel.send('music finished');
					console.log('The song finished');
					console.log(oldOne);
					console.log(newOne);

					bot.musicQueue.shift();
					var music = bot.musicQueue[0];
					await player.play(getResource(music.url));
				}
			});

			bot.voiceConnection.subscribe(player);

		} catch (error) {
			message.channel.send('something went wrong!');
			console.error(error);
		}
	}
};

function getResource(url){
	const stream = ytdl(url, {
		filter: 'audioonly'
	});
	const resource = createAudioResource(stream);
	return resource;
}