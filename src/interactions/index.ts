import { InteractionReplyOptions } from 'discord.js'

export const guard = async <T extends { reply(options: InteractionReplyOptions): void }>(
    interaction: T,
    process: (interaction: T) => Promise<void>,
) => {
    try {
        await process(interaction)
    } catch {
        interaction.reply({
            content: 'An error occurred, please report it to server admins.',
            ephemeral: true,
        })
    }
}
