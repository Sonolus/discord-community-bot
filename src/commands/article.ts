import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, User } from 'discord.js'
import { contents } from '../contents'
import { getArticleMessage } from '../messages/article'

const count = 3

export const articleCommands = [...contents.entries()].map(
    ([locale, { articles }]) => {
        const data = new SlashCommandBuilder()
            .setName(locale)
            .setDescription(`Articles for ${locale}`)

        for (const [id, { title }] of articles) {
            data.addSubcommand((builder) => {
                builder.setName(id).setDescription(title)
                ;[...Array(count).keys()].forEach((i) =>
                    builder.addUserOption((option) =>
                        option
                            .setName(`user-${i + 1}`)
                            .setDescription('User to mention')
                    )
                )

                return builder
            })
        }

        return {
            data,

            async execute(interaction: CommandInteraction) {
                const id = interaction.options.getSubcommand()
                const userIds = [...Array(count).keys()]
                    .map((i) => interaction.options.getUser(`user-${i + 1}`))
                    .filter((user): user is User => !!user)
                    .map((user) => user.id)

                await interaction.reply({
                    ...getArticleMessage(locale, '', id, userIds),
                    ephemeral: !userIds.length,
                    components: [],
                })
            },
        }
    }
)
