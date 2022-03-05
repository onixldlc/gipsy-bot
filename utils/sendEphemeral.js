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
	 *
	 * @param {Message} message
	 * @param {String} description
	 * @param {String} fileToAttach
	 */
	sendAttachedEphemeral:(message, fileToAttach, description)=>{
		const attachment = new MessageAttachment(fileToAttach);
		attachment.ephemeral = true
		attachment.description = description
		return message.channel.send(attachment)
	}
}