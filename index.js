const { Client, GatewayIntentBits, REST, Routes, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { bot_token, guild_id } = require("./config.js")
const fs = require("node:fs")
//
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
//
// Bot login
client.login(bot_token);
const rest = new REST({ version: '10' }).setToken(bot_token);
//
// Load and run commands
let commands = []
client.commands = new Collection()
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith("command.js"))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    //
    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
}
client.once("ready", async () => {
    try {
		const data = await rest.put(Routes.applicationGuildCommands(client.user.id, guild_id), { body: commands });
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})
client.on("interactionCreate", async interaction => {
    if(!interaction.isChatInputCommand()) return
    //
    const command = client.commands.get(interaction.commandName)
    if(command) {
       await command.execute(interaction)
    }
})
//