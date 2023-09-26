import { BaseMessageOptions, MessageComponentInteraction, MessageType } from 'discord.js'

export const replyOrUpdate = (
    interaction: MessageComponentInteraction,
    message: Pick<BaseMessageOptions, 'content' | 'components'>,
) =>
    interaction.message.type === MessageType.Reply
        ? interaction.update(message)
        : interaction.reply({ ...message, ephemeral: true })
