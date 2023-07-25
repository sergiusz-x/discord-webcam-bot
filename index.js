const { Client, GatewayIntentBits, REST, Routes, Collection } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const { bot_token, guild_id, auto_restart } = require("./config.js")
const fs = require("node:fs")
//
client.on('ready', () => {
    log(`Logged in as ${client.user.tag}!`)
})
//
// Bot login
client.login(bot_token);
const rest = new REST({ version: '10' }).setToken(bot_token)
//
// Load and run commands
let commands = []
client.commands = new Collection()
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith("command.js"))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)
    //
    commands.push(command.command)
    client.commands.set(command.command.name, command)
}
client.once("ready", async () => {
    try {
		const data = await rest.put(Routes.applicationGuildCommands(client.user.id, guild_id), { body: commands })
        log(`Successfully reloaded ${data.length} commands`)
    } catch (error) {
        console.error(error)
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
// Auto restart
if(auto_restart > 0) {
    setTimeout(() => {
        log("Auto restart")
        process.exit(0)
    }, 1000 * 60 * auto_restart)
}
//
let time
function log(string) {
    time = new Date().toLocaleString("pl-PL", { hour12: false })
    console.log(`[${time}] ${string}`)
}
module.exports = { log }