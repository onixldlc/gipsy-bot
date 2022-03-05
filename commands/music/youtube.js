const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');

module.exports = {
	name: 'youtube',
	aliases: [ 'yt' ],
	description: 'play music from youtube',
	ownerOnly: false,
	hidden: false,
        
	run: async (bot, message, args) => {        
		const connection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator
		});
		
		const stream = ytdl(args[0], {
			filter: 'audioonly'
		});
        
		const player = createAudioPlayer();
		const resource = createAudioResource(stream);   
        
		// refactor these please
		try {
			await player.play(resource);
			player.on('error', (error) => {
				console.log(`${error.message}`);
			});
			connection.subscribe(player);
		} catch (error) {
			console.error(error);
		}   
	}
};

/**
 * Known Issues :
 * bot crashes if member is not in voice channel
 */