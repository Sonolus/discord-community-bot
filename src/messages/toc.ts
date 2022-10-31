import { bold, underscore } from '@discordjs/builders'
import { MessageActionRow, MessageSelectMenu } from 'discord.js'
import { contents } from '../contents'

export function getTocMessage(locale: string) {
    const content = contents.get(locale)
    if (!content) throw `Locale \`${locale}\` not found`

    const menu = new MessageSelectMenu()
        .setCustomId('category')
        .setPlaceholder(content.select)
        .addOptions(
            [...content.categories.entries()].map(([id, { title }]) => ({
                label: title,
                value: `${locale}.${id}`,
            }))
        )

    return {
        content: [...content.categories.values()]
            .map(({ title, articleIds }) =>
                [
                    underscore(bold(title)),
                    ...articleIds.map(
                        (id) => `- ${content.articles.get(id)?.title}`
                    ),
                ].join('\n')
            )
            .join('\n\n'),
        components: [new MessageActionRow().addComponents(menu)],
    }
}
