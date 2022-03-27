const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');

// only support youtube for now

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
			// bisa refactor jadi shift() kalo queue.js ga butuh kaya gini.
			let music = bot.musicQueue[0];
			await player.play(getResource(music.url));

			player
				.on('error', (error) => {
					message.channel.send('something went wrong!');
					console.error(error);
				})
				.on('')
				.addListener('stateChange', async (oldOne, newOne) => {
					if (newOne.status == 'idle') {
						message.channel.send('music finished');
						console.log('The song finished');
						console.log(`old status: ${oldOne.status}`);
						console.log(`new status: ${newOne.status}`);

						
						bot.musicQueue.shift();
						music = bot.musicQueue[0];

						if (!music) {
							bot.voiceConnection.unsubscribe(player);
							return;
						}
						await player.play(getResource(music.url));
					}
				});
				
			bot.voiceConnection.subscribe(player);

		} catch (error) {
			message.channel.send('something went wrong!2');
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


/**
 * TO DO :
 * empty queue when bot disconnect -> once?
 */