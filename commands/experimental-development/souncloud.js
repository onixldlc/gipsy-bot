const { 
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource
} = require('@discordjs/voice');

module.exports = {
	name: 'soundcloud',
	aliases: [ 'sc' ],
	description: 'play music from soundcloud',
	ownerOnly: false,
	hidden: false,
        
	run: async (bot, message, args) => {        
		const baseurl = 'https://api.soundcloud.com/connect?';
		const query = {
			clientid: '',
			redirectURI: 'https://soundcloud.com',
			responseType: 'code'
			// state: '' for CSRF protection but idk how to gen random string :(
		};
		const apiURL = baseurl + 
			`client_id=${query.clientid}` + 
			`redirect_uri=${query.redirectURI}` +
			`response_type=${query.responseType}`;
	}
};

/**
 * Known Issues :
 * bot crashes if member is not in voice channel
 */