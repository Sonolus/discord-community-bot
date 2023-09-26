import { ButtonInteraction } from 'discord.js'
import { contents } from '../contents'
import { getCategoryMessage } from '../messages/category'
import { replyOrUpdate } from '../utils'

export const categoryButtons = [...contents.entries()]
    .map(([locale, { categories }]) =>
        [...categories.keys()].map((id) => ({
            id: `category.${locale}.${id}`,
            execute: (interaction: ButtonInteraction) =>
                replyOrUpdate(interaction, {
                    ...getCategoryMessage(locale, id),
                    ephemeral: true,
                }),
        })),
    )
    .flat()
