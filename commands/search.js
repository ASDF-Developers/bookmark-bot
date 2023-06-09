import { SlashCommandBuilder } from "@discordjs/builders";
import { Bookmark } from "../models/Bookmark.js";
import { EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("search")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("search category")
        .addChoices({ name: "Flutter", value: "flutter" })
        .addChoices({ name: "Javascript", value: "javascript" })
        .addChoices({ name: "Useful", value: "useful" })
        .addChoices({ name: "Tool", value: "tool" })
        .addChoices({ name: "Article", value: "article" })
        .addChoices({ name: "Newbie Useful", value: "newbiebuseful" })
        .addChoices({ name: "Video", value: "video" })
        .addChoices({ name: "Python", value: "python" })
        .setRequired(false)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("fetch user").setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("query").setDescription("query").setRequired(false)
    ),
  run: async (client, interaction) => {
    const user = interaction.options.get("user");
    const query = interaction.options.get("query");
    const category = interaction.options.get("category");

    if (category) {
      const categoryList = await Bookmark.find({ category: category.value });
      const fields = categoryList.map((item) => {
        return { name: `${item.desc}`, value: `${item.url}` };
      });

      const categoryListEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Search")
        .addFields(fields)
        .setTimestamp();

      if (categoryList.length === 0) {
        await interaction.reply({
          content: "Not found",
          ephemeral: true,
        });
      }

      await interaction.reply({
        embeds: [categoryListEmbed],
        ephemeral: false,
      });
    }
    if (user) {
      const userList = await Bookmark.find({ author_id: user.value });
      const userFields = userList.map((item) => {
        return { name: `${item.desc}`, value: `${item.url}` };
      });
      const userBookmarkListEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("User search results")
        .addFields({ name: "user", value: `<@${user.value}>` })
        .addFields(userFields)
        .setTimestamp();

      if (userList.length === 0) {
        await interaction.reply({
          content: "Not found",
          ephemeral: true,
        });
      }
      await interaction.reply({
        embeds: [userBookmarkListEmbed],
        ephemeral: false,
      });
    }
    if (query) {
      const queryList = await Bookmark.aggregate().search({
        text: {
          query: query.value,
          path: "desc",
        },
      });
      console.log(queryList);

      const queryFields = queryList.map((item) => {
        return { name: `${item.desc}`, value: `${item.url}` };
      });
      const queryBookmarkListEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Query search results")
        .addFields(
          queryList.length <= 0
            ? { name: `${query.value}`, value: "Not found" }
            : queryFields
        )
        .setTimestamp();
      await interaction.reply({
        embeds: [queryBookmarkListEmbed],
        ephemeral: false,
      });
    }
  },
};
