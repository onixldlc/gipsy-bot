const ytdl = require('ytdl-core');
const { musicStart, connect } = require('../utils/playMusic')

module.exports = {
	name: 'play',
	description: 'play music',
	ownerOnly: false,
	hidden: false,
		
	async run (bot, message, args) {
		const { channel } = message.member.voice;

		var urlRegex =  /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
		var url = args[0].replace(/<(http.*)>/,"$1")

		if(!urlRegex.test(url))return message.channel.send("you did not pay us to develop this yet... YOU FUCK !!!");

		if(!channel){return message.channel.send("you need to be on a vc first")}
		

		const videInfo = (await ytdl.getBasicInfo(url)).videoDetails

		const stream = ytdl(url, {
			filter: "audioonly"
		});

		const music = {
			title: videInfo.title,
			duration: videInfo.lengthSeconds,
			url: videInfo.video_url
		}

		bot.musicQueue.push(music)
		
		console.log(bot.musicQueue)

		if(!bot.connection){
			connect(bot,message)
			musicStart(bot, message)
		}
		
	}
};