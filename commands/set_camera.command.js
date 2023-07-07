const { Webcam } = require("../webcam")
const fs = require("node:fs")
//
let webcams_list = []
Webcam.list(list => {
	webcams_list = list
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
				description: `The index of the webcam on the list`
			}
		]
	},
    //
	async execute(interaction) {
		const number = Number(interaction.options._hoistedOptions[0].value)
		//
		if(!webcams_list[number]) {
			return interaction.reply({ content: `There is no camera available at this index! To show all available cameras use command: \`/camlist\``})
		}
		//
		let optionsJSON = JSON.parse(fs.readFileSync(`${__dirname}/../options.json`))
		optionsJSON.device = webcams_list[number]
		//
		fs.writeFileSync(`${__dirname}/../options.json`, JSON.stringify(optionsJSON, null, 4))
		//
		interaction.reply({ content: `Successfully changed the webcam!`})
	}
}