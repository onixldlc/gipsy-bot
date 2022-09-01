const { LavasfyClient } = require("lavasfy");

module.exports = {
  init: async(bot) => {
    const lavasfy = new LavasfyClient({
      clientID: bot.config.SPOTIFY_ID,
      clientSecret: bot.config.SPOTIFY_SECRET
    }, [{
      id: "main",
      host: "localhost",
      port: 2333,
      password: "youshallnotpass",
      secure: false
    }])
    await lavasfy.requestToken();
    const node = lavasfy.getNode("main");
    return node
  }
}
