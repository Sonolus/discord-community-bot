import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    bold,
    underscore,
} from 'discord.js'
import { contents } from '../contents'

export const getCategoryMessage = (locale: string, categoryId: string) => {
    const content = contents.get(locale)
    if (!content) throw new Error(`Locale \`${locale}\` not found`)
    const category = content.categories.get(categoryId)
    if (!category) throw new Error(`Category \`${categoryId}\` not found`)

    const articleIds = category.articleIds.filter((id) => content.articles.has(id))

    const menu = new StringSelectMenuBuilder()
        .setCustomId('article')
        .setPlaceholder(content.select)
        .addOptions(
            articleIds.map((id) => ({
                label: content.articles.get(id)?.title ?? '',
                value: `${locale}.${id}`,
            })),
        )

    const backButton = new ButtonBuilder()
        .setCustomId(`toc.${locale}`)
        .setLabel(content.back)
        .setStyle(ButtonStyle.Secondary)

    return {
        content: [
            underscore(bold(category.title)),
            ...articleIds.map((id) => `- ${content.articles.get(id)?.title}`),
        ].join('\n'),
        components: [
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu),
            new ActionRowBuilder<ButtonBuilder>().addComponents(backButton),
        ],
    }
}
