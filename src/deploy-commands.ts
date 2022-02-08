import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/rest/v9'
import { commands } from './commands'
import { clientId, guildId, token } from './config.json'

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands.map(({ data }) => data.toJSON()),
})
