import { ButtonInteraction } from 'discord.js'
import { buttons } from '../buttons'

export async function processButton(interaction: ButtonInteraction) {
    const button = buttons.find(({ id }) => id === interaction.customId)
    if (!button) throw new Error(`Button \`${interaction.customId}\` not found`)

    await button.execute(interaction)
}
