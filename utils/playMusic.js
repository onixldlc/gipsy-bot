const ytdl = require('ytdl-core');
const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
} = require('@discordjs/voice');

function getResource(url){
	const stream = ytdl(url, {
		filter: "audioonly"
	});
	const resource = createAudioResource(stream);
	return resource
}


module.exports={

	connect:(bot, message)=>{
		bot.connection = joinVoiceChannel({
			channelId: message.member.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
		});

	},

	musicStart:async (bot, message)=>{
		const player = createAudioPlayer();

		try {
			var music = bot.musicQueue[0]
			await player.play(getResource(music.url))

			player.on('error', error => {
				message.channel.send("sumtin went rong wit de pleye la :V dunno what ah")
				console.log(`${error.message}`);
			});

			player.addListener("stateChange", async (oldOne, newOne)=>{
				if (newOne.status == "idle") {
					message.channel.send("music finished")
					console.log("The song finished");
					console.log(newOne);

					bot.musicQueue.shift(1)
					var music = bot.musicQueue[0]
					if(!music){
						bot.connection.unsubscribe(player);
						return;
					}
					await player.play(getResource(music.url));
				}
			})

			bot.connection.subscribe(player);

		} catch (error) {
				message.channel.send("sumtin went rong wen setartin de peleye laaa")
				console.log(error);
		}

	}
}