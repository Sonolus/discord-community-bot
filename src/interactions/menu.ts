import { StringSelectMenuInteraction } from 'discord.js'
import { menus } from '../menus'

export const processMenu = async (interaction: StringSelectMenuInteraction) => {
    const menu = menus.find(
        ({ id, value }) => id === interaction.customId && value === interaction.values[0],
    )
    if (!menu)
        throw new Error(`Menu \`${interaction.customId}\` > \`${interaction.values[0]}\` not found`)

    await menu.execute(interaction)
}
