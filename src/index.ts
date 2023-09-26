import {
    ButtonInteraction,
    Client,
    CommandInteraction,
    GatewayIntentBits,
    InteractionReplyOptions,
    StringSelectMenuInteraction,
} from 'discord.js'
import { buttons } from './buttons'
import { commands } from './commands'
import { clientId, guildId, token } from './config.json'
import { menus } from './menus'

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
    console.log('Sonolus Discord Community Bot is now online')
    console.log('Client ID', clientId)
    console.log('Guild ID', guildId)
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) return guard(interaction, processCommand)
    if (interaction.isButton()) return guard(interaction, processButton)
    if (interaction.isStringSelectMenu()) return guard(interaction, processMenus)
})

void client.login(token)

async function guard<T extends { reply(options: InteractionReplyOptions): void }>(
    interaction: T,
    process: (interaction: T) => Promise<void>,
) {
    try {
        await process(interaction)
    } catch {
        interaction.reply({
            content: 'An error occurred, please report it to server admins.',
            ephemeral: true,
        })
    }
}

async function processCommand(interaction: CommandInteraction) {
    const command = commands.find(({ data: { name } }) => name === interaction.commandName)
    if (!command) throw new Error(`Command \`${interaction.commandName}\` not found`)

    await command.execute(interaction)
}

async function processButton(interaction: ButtonInteraction) {
    const button = buttons.find(({ id }) => id === interaction.customId)
    if (!button) throw new Error(`Button \`${interaction.customId}\` not found`)

    await button.execute(interaction)
}

async function processMenus(interaction: StringSelectMenuInteraction) {
    const menu = menus.find(
        ({ id, value }) => id === interaction.customId && value === interaction.values[0],
    )
    if (!menu)
        throw new Error(`Menu \`${interaction.customId}\` > \`${interaction.values[0]}\` not found`)

    await menu.execute(interaction)
}
