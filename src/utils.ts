import {
    InteractionReplyOptions,
    MessageComponentInteraction,
} from 'discord.js'

export function replyOrUpdate(
    interaction: MessageComponentInteraction,
    options: InteractionReplyOptions
) {
    if (interaction.message.type === 'REPLY') {
        return interaction.update(options)
    } else {
        return interaction.reply(options)
    }
}
