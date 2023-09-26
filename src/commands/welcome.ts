import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { getWelcomeMessage } from '../messages/welcome'

export const welcomeCommand = {
    data: new SlashCommandBuilder().setName('welcome').setDescription('Generate welcome message'),

    async execute(interaction: CommandInteraction) {
        if ((await interaction.guild?.fetchOwner())?.id !== interaction.user.id)
            throw new Error('Only server owner can use this command')

        await interaction.reply(getWelcomeMessage())
    },
}
