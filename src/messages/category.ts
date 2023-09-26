import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    bold,
    underscore,
} from 'discord.js'
import { contents } from '../contents'

export function getCategoryMessage(locale: string, categoryId: string) {
    const content = contents.get(locale)
    if (!content) throw new Error(`Locale \`${locale}\` not found`)
    const category = content.categories.get(categoryId)
    if (!category) throw new Error(`Category \`${categoryId}\` not found`)

    const menu = new StringSelectMenuBuilder()
        .setCustomId('article')
        .setPlaceholder(content.select)
        .addOptions(
            category.articleIds.map((id) => ({
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
            ...category.articleIds.map((id) => `- ${content.articles.get(id)?.title}`),
        ].join('\n'),
        components: [
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu),
            new ActionRowBuilder<ButtonBuilder>().addComponents(backButton),
        ],
    }
}
