import { StringSelectMenuInteraction } from 'discord.js'
import { contents } from '../contents'
import { getArticleMessage } from '../messages/article'
import { replyOrUpdate } from '../utils'

export const articleMenus = [...contents.entries()]
    .map(([locale, { categories }]) =>
        [...categories.entries()].map(([id, { articleIds }]) =>
            articleIds.map((articleId) => ({
                id: 'article',
                value: `${locale}.${articleId}`,
                execute: (interaction: StringSelectMenuInteraction) =>
                    replyOrUpdate(interaction, getArticleMessage(locale, id, articleId)),
            })),
        ),
    )
    .flat(2)
