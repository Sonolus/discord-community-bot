import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { contents } from '../contents'

export function getWelcomeMessage() {
    const buttons = [...contents.entries()].map(([locale, { name }]) =>
        new ButtonBuilder()
            .setCustomId(`toc.${locale}`)
            .setLabel(name)
            .setStyle(ButtonStyle.Primary),
    )

    return {
        content: [...contents.values()].map(({ message }) => message).join('\n\n'),
        components: [...Array(Math.ceil(buttons.length / 5)).keys()].map((i) =>
            new ActionRowBuilder<ButtonBuilder>().addComponents(buttons.slice(i * 5, i * 5 + 5)),
        ),
    }
}
