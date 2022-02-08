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
        components: [new MessageActionRow().addComponents(buttons)],
    }
}
