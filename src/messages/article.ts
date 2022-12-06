import { bold, inlineCode, underscore, userMention } from '@discordjs/builders'
import { MessageActionRow, MessageButton } from 'discord.js'
import { contents } from '../contents'

export function getArticleMessage(
    locale: string,
    categoryId: string,
    articleId: string,
    userIds: string[] = []
) {
    const content = contents.get(locale)
    if (!content) throw `Locale \`${locale}\` not found`
    const article = content.articles.get(articleId)
    if (!article) throw `Article \`${articleId}\` not found`

    const backButton = new MessageButton()
        .setCustomId(`category.${locale}.${categoryId}`)
        .setLabel(content.back)
        .setStyle('SECONDARY')

    return {
        content: [
            underscore(bold(article.title)),
            inlineCode(`/${locale} ${articleId}`) +
                ' ' +
                userIds.map(userMention).join(' '),
            '',
            article.body,
        ].join('\n'),
        components: [new MessageActionRow().addComponents(backButton)],
    }
}
