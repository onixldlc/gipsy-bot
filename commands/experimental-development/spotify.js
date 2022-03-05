const axios = require('axios');
const config = require('../../config.json');
const { 
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');

const clientId = config.SPOTIFYID;
const clientSecret = config.SPOTIFYSECRET;

module.exports = {
    name: 'spotify',
    aliases: ['sf'],
    description: 'play music from spotify',
    ownerOnly: false,
    hidden: false,
        
    async run (bot, message, args) {
        message.channel.send('Vladdy Daddy');
        await getToken();
    }
};

async function getToken () {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' +  Buffer.from(`${clientId}:${clientSecret}`, 'base64')
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
    };

    axios.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
      
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/users/jmperezperez',
                headers: {
                'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                console.log(body);
            });
        }
    })
}