import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { contents } from '../contents'
import { getArticleMessage } from '../messages/article'

export const articleCommands = [...contents.entries()].map(
    ([locale, { articles }]) => {
        const data = new SlashCommandBuilder()
            .setName(locale)
            .setDescription(`Articles for ${locale}`)

        for (const [id, { title }] of articles) {
            data.addSubcommand((builder) =>
                builder.setName(id).setDescription(title)
            )
        }

        return {
            data,

            async execute(interaction: CommandInteraction) {
                const id = interaction.options.getSubcommand()

                await interaction.reply({
                    ...getArticleMessage(locale, '', id),
                    components: [],
                })
            },
        }
    }
)
