import { MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js'
import { contents } from '../contents'

export function getCategoryMessage(locale: string, categoryId: string) {
    const content = contents.get(locale)
    if (!content) throw `Locale \`${locale}\` not found`
    const category = content.categories.get(categoryId)
    if (!category) throw `Category \`${categoryId}\` not found`

    const menu = new MessageSelectMenu()
        .setCustomId('article')
        .setPlaceholder(content.select)
        .addOptions(
            category.articleIds.map((id) => ({
                label: content.articles.get(id)?.title || '',
                value: `${locale}.${id}`,
            }))
        )

    const backButton = new MessageButton()
        .setCustomId(`toc.${locale}`)
        .setLabel(content.back)
        .setStyle('SECONDARY')

    return {
        content: [
            `__**${category.title}**__`,
            ...category.articleIds.map(
                (id) => `- ${content.articles.get(id)?.title}`
            ),
        ].join('\n'),
        components: [
            new MessageActionRow().addComponents(menu),
            new MessageActionRow().addComponents(backButton),
        ],
    }
}
