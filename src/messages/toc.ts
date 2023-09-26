import { ActionRowBuilder, StringSelectMenuBuilder, bold, underscore } from 'discord.js'
import { contents } from '../contents'

export function getTocMessage(locale: string) {
    const content = contents.get(locale)
    if (!content) throw new Error(`Locale \`${locale}\` not found`)

    const menu = new StringSelectMenuBuilder()
        .setCustomId('category')
        .setPlaceholder(content.select)
        .addOptions(
            [...content.categories.entries()].map(([id, { title }]) => ({
                label: title,
                value: `${locale}.${id}`,
            })),
        )

    return {
        content: [...content.categories.values()]
            .map(({ title, articleIds }) =>
                [
                    underscore(bold(title)),
                    ...articleIds.map((id) => `- ${content.articles.get(id)?.title}`),
                ].join('\n'),
            )
            .join('\n\n'),
        components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu)],
    }
}
