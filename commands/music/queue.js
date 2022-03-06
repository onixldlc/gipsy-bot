const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	aliases: [ 'mq' ],
	description: 'prints current music queue',
	ownerOnly: true,
	hidden: true,
	
	run: (bot, message, args) => {
		let queueMsg = '';
		let orderNum = 1 ;

		for (let music of bot.musicQueue) {
			queueMsg += `${orderNum++}` + ' - ' + `${music.title}` + '\n';
		}

		const embedstuff = generateEmbedMessage(bot, message, args);
		message.channel.send(queueMsg);
		message.channel.send({embeds: [ embedstuff ]});
	}
};

function generateEmbedMessage (bot, message, args) {
	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setDescription('Description here')
		.setTimestamp()
		.setFooter({ text: 'by gipsy-bot', iconURL: 'https://i.ibb.co/LQyyP93/gipsy-bot-image-modified.png' });

	return embed;
}

/**
 * print embed queue with url and stuff
 */