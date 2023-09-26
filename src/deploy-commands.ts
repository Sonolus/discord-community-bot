import { REST, Routes } from 'discord.js'
import { commands } from './commands'
import { clientId, guildId, token } from './config.json'

const rest = new REST({ version: '9' }).setToken(token)

void rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands.map(({ data }) => data.toJSON()),
})
