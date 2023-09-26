import { CommandInteraction } from 'discord.js'
import { commands } from '../commands'

export const processCommand = async (interaction: CommandInteraction) => {
    const command = commands.find(({ data: { name } }) => name === interaction.commandName)
    if (!command) throw new Error(`Command \`${interaction.commandName}\` not found`)

    await command.execute(interaction)
}
