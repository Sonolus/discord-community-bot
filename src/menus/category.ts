import { StringSelectMenuInteraction } from 'discord.js'
import { contents } from '../contents'
import { getCategoryMessage } from '../messages/category'
import { replyOrUpdate } from '../utils'

export const categoryMenus = [...contents.entries()]
    .map(([locale, { categories }]) =>
        [...categories.keys()].map((id) => ({
            id: 'category',
            value: `${locale}.${id}`,
            execute: (interaction: StringSelectMenuInteraction) =>
                replyOrUpdate(interaction, getCategoryMessage(locale, id)),
        })),
    )
    .flat()
