import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    bold,
    inlineCode,
    underscore,
    userMention,
} from 'discord.js'
import { contents } from '../contents'

export function getArticleMessage(
    locale: string,
    categoryId: string,
    articleId: string,
    userIds: string[] = [],
) {
    const content = contents.get(locale)
    if (!content) throw new Error(`Locale \`${locale}\` not found`)
    const article = content.articles.get(articleId)
    if (!article) throw new Error(`Article \`${articleId}\` not found`)

    const backButton = new ButtonBuilder()
        .setCustomId(`category.${locale}.${categoryId}`)
        .setLabel(content.back)
        .setStyle(ButtonStyle.Secondary)

    return {
        content: [
            underscore(bold(article.title)),
            inlineCode(`/${locale} ${articleId}`) + ' ' + userIds.map(userMention).join(' '),
            '',
            article.body,
        ].join('\n'),
        components: [new ActionRowBuilder<ButtonBuilder>().addComponents(backButton)],
    }
}
