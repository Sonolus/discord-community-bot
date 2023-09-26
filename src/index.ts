import { Client, GatewayIntentBits } from 'discord.js'
import { clientId, guildId, token } from './config.json'
import { guard } from './interactions'
import { processButton } from './interactions/button'
import { processCommand } from './interactions/command'
import { processMenu } from './interactions/menu'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
    console.log('Sonolus Discord Community Bot is now online')
    console.log('Client ID', clientId)
    console.log('Guild ID', guildId)
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) return guard(interaction, processCommand)
    if (interaction.isButton()) return guard(interaction, processButton)
    if (interaction.isStringSelectMenu()) return guard(interaction, processMenu)
})

void client.login(token)
