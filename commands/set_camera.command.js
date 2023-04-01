const { Webcam } = require("../webcam")
const fs = require("node:fs")
//
let webcams_list = []
Webcam.list(list => {
	webcams_list = list.map(x => Number(x))
})
//
module.exports = {
	command: {
		name: "setcamera",
		description: "Change webcam camera",
		options: [
			{
				name: "number",
				required: true,
				type: 4,
				description: `The number of the webcam on the list`
			}
		]
	},
    //
	async execute(interaction) {
		const number = interaction.options._hoistedOptions[0].value
		//
		if(!webcams_list.map(x => Number(x)).includes(number)) {
			return interaction.reply({ content: `This number does not exist in the list! The available numbers are: \`${webcams_list.join(", ")}\``})
		}
		//
		let optionsJSON = JSON.parse(fs.readFileSync(`${__dirname}/../options.json`))
		optionsJSON.device = String(number)
		//
		fs.writeFileSync(`${__dirname}/../options.json`, JSON.stringify(optionsJSON, null, 4))
		//
		interaction.reply({ content: `Successfully changed the webcam number!`})
	}
}