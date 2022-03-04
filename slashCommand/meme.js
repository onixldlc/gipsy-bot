const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
	name: "meme",
	description: "returns stuff",
	type: 'CHAT_INPUT',
	options: [
		{
			name: "name",
			description: "meme name",
			required: true,
			type: 3
		},
	],
	/**
	 *
	 * @param {Client} bot
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		// args = args._hoistedOptions
		// console.log(bot.imgDb)

		if(args[0] === "list"){
			var memeList = new MessageEmbed()
				.setTitle("memeLists")
				.setDescription("list meme that can be used")
				.setColor("#F8AA2A");

			var memes = Array.from(bot.imgDb);
			
			// console.log(memes, memeList);

			memes.forEach((value)=>{
				memeList.addField(
					`**${value[0] || "... idiot"}**`,
					`${value[1].description || "the creator was so dumb he forgot to add this part of the thing"}`,
					true
				)
				// console.log(value[0], value[1] )
			})

			return interaction.followUp({ embeds: [memeList] });
		}

		var retLink = bot.imgDb.get(args[0])

		if (!retLink) return interaction.followUp({ content: `pffttt man you must be new here, we dont have **\`${args[0]}\`** meme here m8` });
		interaction.followUp({ content: `${retLink.url}` });
	},
};