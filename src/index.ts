import {
    ButtonInteraction,
    Client,
    CommandInteraction,
    Intents,
    InteractionReplyOptions,
    SelectMenuInteraction,
} from 'discord.js'
import { buttons } from './buttons'
import { commands } from './commands'
import { clientId, guildId, token } from './config.json'
import { menus } from './menus'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
    console.log('Sonolus Discord Community Bot is now online')
    console.log('Client ID', clientId)
    console.log('Guild ID', guildId)
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) return guard(interaction, processCommand)
    if (interaction.isButton()) return guard(interaction, processButton)
    if (interaction.isSelectMenu()) return guard(interaction, processMenus)
})

client.login(token)

async function guard<
    T extends { reply(options: InteractionReplyOptions): void },
>(interaction: T, process: (interaction: T) => Promise<void>) {
    try {
        await process(interaction)
    } catch (error) {
        interaction.reply({
            content: `An error occurred:\n> ${error}`,
            ephemeral: true,
        })
    }
}

async function processCommand(interaction: CommandInteraction) {
    const command = commands.find(
        ({ data: { name } }) => name === interaction.commandName
    )
    if (!command) throw `Command \`${interaction.commandName}\` not found`

    await command.execute(interaction)
}

async function processButton(interaction: ButtonInteraction) {
    const button = buttons.find(({ id }) => id === interaction.customId)
    if (!button) throw `Button \`${interaction.customId}\` not found`

    await button.execute(interaction)
}

async function processMenus(interaction: SelectMenuInteraction) {
    const menu = menus.find(
        ({ id, value }) =>
            id === interaction.customId && value === interaction.values[0]
    )
    if (!menu)
        throw `Menu \`${interaction.customId}\` > \`${interaction.values[0]}\` not found`

    await menu.execute(interaction)
}
