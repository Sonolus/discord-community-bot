import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import { getWelcomeMessage } from '../messages/welcome'

export const welcomeCommand = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Generate welcome message'),

    async execute(interaction: CommandInteraction) {
        if ((await interaction.guild?.fetchOwner())?.id !== interaction.user.id)
            throw 'Only server owner can use this command'

        await interaction.reply({
            ...getWelcomeMessage(),
        })
    },
}
