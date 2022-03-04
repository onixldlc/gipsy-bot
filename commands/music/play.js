const ytdl = require('ytdl-core');
const { 
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');


module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'play music',
    ownerOnly: false,
    hidden: false,
        
    async run (bot, message, args) {        
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        const stream = ytdl(args[0], {
            filter: "audioonly"
        });
        
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);
        
        try {
            await player
            .play(resource)
            
            player
            .on('error', error => {
                console.log(`${error.message}`);
            });
            connection.subscribe(player);
        } catch (error) {
            console.log(error);
        }
        
    }
};