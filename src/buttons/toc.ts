import { ButtonInteraction } from 'discord.js'
import { contents } from '../contents'
import { getTocMessage } from '../messages/toc'
import { replyOrUpdate } from '../utils'

export const tocButtons = [...contents.keys()].map((locale) => ({
    id: `toc.${locale}`,
    execute: (interaction: ButtonInteraction) =>
        replyOrUpdate(interaction, {
            ...getTocMessage(locale),
            ephemeral: true,
        }),
}))
