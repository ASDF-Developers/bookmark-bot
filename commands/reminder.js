import { SlashCommandBuilder } from "@discordjs/builders";
import { schedule } from "node-cron";
export default {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("reminder")
    .addStringOption((option) =>
      option
        .setName("time")
        .setDescription("reminder")
        .addChoices({ name: "Flutter", value: "flutter" })
        .setRequired(false)
    ),

  run: async (client, interaction) => {
    /*  
    const hours = interaction.options.get("hours");
    const day = interaction.options.get("day");
    const month = interaction.options.get("month"); 
    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *
    */

    schedule(
      "11 23 * * *",
      () => {
        console.log("Running a job at 01:00 at America/Sao_Paulo timezone");
      },
      {
        scheduled: true,
        timezone: "Europe/Istanbul",
      }
    );
    interaction.reply("sss");
  },
};
