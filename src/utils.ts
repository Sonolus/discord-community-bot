import { BaseMessageOptions, MessageComponentInteraction, MessageType } from 'discord.js'

export function replyOrUpdate(
    interaction: MessageComponentInteraction,
    message: Pick<BaseMessageOptions, 'content' | 'components'>,
) {
    if (interaction.message.type === MessageType.Reply) {
        return interaction.update(message)
    } else {
        return interaction.reply({ ...message, ephemeral: true })
    }
}
