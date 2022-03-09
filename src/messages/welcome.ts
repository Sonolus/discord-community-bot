import { MessageActionRow, MessageButton } from 'discord.js'
import { contents } from '../contents'

export function getWelcomeMessage() {
    const buttons = [...contents.entries()].map(([locale, { name }]) =>
        new MessageButton()
            .setCustomId(`toc.${locale}`)
            .setLabel(name)
            .setStyle('PRIMARY')
    )

    return {
        content: [...contents.values()]
            .map(({ message }) => message)
            .join('\n\n'),
        components: [...Array(Math.ceil(buttons.length / 5)).keys()].map((i) =>
            new MessageActionRow().addComponents(
                buttons.slice(i * 5, i * 5 + 5)
            )
        ),
    }
}
