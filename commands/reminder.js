import { SlashCommandBuilder } from "@discordjs/builders";
import moment from "moment";
import { schedule, validate } from "node-cron";
export default {
  data: new SlashCommandBuilder()
    .setName("reminder")
    .setDescription("reminder")
    .addStringOption((option) =>
      option.setName("text").setDescription("text").setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("minutes")
        .setDescription("minutes")
        .addChoices(
          { name: "1 minutes later", value: 1 },
          { name: "10 minutes later", value: 10 },
          { name: "15 minutes later", value: 15 },
          { name: "30 minutes later", value: 30 },
          { name: "45 minutes later", value: 45 }
        )
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("hours")
        .setDescription("hours")
        .addChoices(
          { name: "1 hours later", value: 1 },
          { name: "2 hours later", value: 2 },
          { name: "3 hours later", value: 3 },
          { name: "4 hours later", value: 4 },
          { name: "5 hours later", value: 5 },
          { name: "6 hours later", value: 6 },
          { name: "7 hours later", value: 7 },
          { name: "8 hours later", value: 8 },
          { name: "10 hours later", value: 10 },
          { name: "12 hours later", value: 12 }
        )
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("day")
        .setDescription("day")
        .addChoices(
          { name: "1 day later", value: 1 },
          { name: "2 day later", value: 2 },
          { name: "3 day later", value: 3 },
          { name: "4 day later", value: 4 },
          { name: "5 day later", value: 5 },
          { name: "6 day later", value: 6 },
          { name: "1 week later", value: 7 }
        )
        .setRequired(false)
    ),

  run: async (client, interaction) => {
    const minute = interaction.options.get("minutes");
    const hour = interaction.options.get("hours");
    const day = interaction.options.get("day");
    const text = interaction.options.get("text");

    if (minute) {
      const minutes = moment().add(minute.value, "m").format("mm hh DD MM");

      schedule(
        `${minutes} *`,
        async () => {
          await interaction.followUp({
            content: `${text.value}`,
            ephemeral: true,
          });
        },
        {
          scheduled: true,
          timezone: "Europe/Istanbul",
        }
      );
      await interaction.reply({
        content: `wwwwwwwwwwwwwwwwwwwwwww`,
        ephemeral: true,
      });
    }
    if (hour) {
      const hours = moment().add(hour.value, "h").format("mm hh DD MM");

      schedule(
        `${hours} *`,
        async () => {
          await interaction.followUp({
            content: `${text.value}`,
            ephemeral: true,
          });
        },
        {
          scheduled: true,
          timezone: "Europe/Istanbul",
        }
      );
      await interaction.reply({
        content: `wwwwwwwwwwwwwwwwwwwwwww`,
        ephemeral: true,
      });
    }
    if (day) {
      const days = moment().add(day.value, "d").format("mm hh DD MM");

      schedule(
        `${days} *`,
        async () => {
          await interaction.followUp({
            content: `${text.value}`,
            ephemeral: true,
          });
        },
        {
          scheduled: true,
          timezone: "Europe/Istanbul",
        }
      );
      await interaction.reply({
        content: `wwwwwwwwwwwwwwwwwwwwwww`,
        ephemeral: true,
      });
    }

    /*
    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *
      0 13 20 05 *
    */
  },
};
