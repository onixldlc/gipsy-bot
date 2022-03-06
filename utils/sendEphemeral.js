// @ts-check
const { CommandInteraction, MessageAttachment, Message, MessageEmbed} = require("discord.js");

function sendTempMessage(interaction){
	interaction.followUp("okay")
	.then(msg => {
		setTimeout(() => msg.delete(), 500)
	});
}

module.exports={
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String} ephemeralMsg
	 */
	interactioSendEphemeral:(interaction, ephemeralMsg)=>{
		sendTempMessage(interaction);
		return interaction.followUp({ content: ephemeralMsg, ephemeral: true });
	},

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {MessageEmbed[]} embedList
	 */
	interactionSendEmbedEphemeral:(interaction, embedList)=>{
		sendTempMessage(interaction);
		return interaction.followUp({ embeds: embedList, ephemeral: true });
	},

	/**
	 * @param {Message} message
	 * @param {String} description
	 * @param {String} path
	 */
	sendAttachedEphemeral:(message, path, description="test")=>{
		const attachment = new MessageAttachment(path);
		attachment.ephemeral = true
		attachment.description = description
		console.log(attachment)
		return message.channel.send({content:"test", files:[attachment]})
	}
}