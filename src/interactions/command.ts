import { CommandInteraction } from 'discord.js'
import { commands } from '../commands'

export async function processCommand(interaction: CommandInteraction) {
    const command = commands.find(({ data: { name } }) => name === interaction.commandName)
    if (!command) throw new Error(`Command \`${interaction.commandName}\` not found`)

    await command.execute(interaction)
}
