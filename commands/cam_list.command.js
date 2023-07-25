const { Webcam } = require("../webcam")
const fs = require("node:fs")
//
let webcams_list = []
Webcam.list(list => {
	for(i = 0; i < list.length; i++) {
		webcams_list.push(`> **[${i}]** \`${list[i]}\``)
	}
})
//
module.exports = {
	command: {
		name: "camlist",
		description: "Shows all available cameras",
	},
    //
	async execute(interaction) {
		const { device } = require("../options.json")
		//
		interaction.reply({ content: `Here are all available cameras and their indexes:
		${webcams_list.join("\n")}
		
		Current camera: **${device}**`})
	}
}