const { SlashCommandBuilder } = require('discord.js')
const { take_and_save_image, save_image_to_hook_db } = require("../webcam")
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('photo')
		.setDescription('Take photo'),
    //
	async execute(interaction) {
		interaction.reply({ content: `Taking photo...!`, ephemeral: true })
		//
		const zdj = await take_and_save_image()
		//
		if(zdj) {
			interaction.editReply({ content: "Successfully shot the photo!", files: [`${__dirname}/../image.png`]})
			save_image_to_hook_db()
		} else {
			interaction.editReply({ content: "Failed while taking the photo!" })
		}
	}
}