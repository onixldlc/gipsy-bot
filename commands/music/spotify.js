const spotifyHelper = require("../util/spotifyHelper.js")

module.exports = {
  name: 'spotify',
  aliases: [ 'sp' ],
  description: 'play music from spotify',
  ownerOnly: false,
  hidden: false,

  run: async (bot, message, args) => {
    if (!message.member.voice.channel) {
      message.reply('you\'re not in a voice channel you dumdum');
      return;
    }
    if (!bot.spotify) {bot.spotify = await spotifyHelper.init(bot)}
    console.log(bot.spotify)
    var track = await bot.spotify.load(args[0])
    console.log(track)
    message.reply(`\`\`\`\n${JSON.stringify(track)} \`\`\``)
  }
}

