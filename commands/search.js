import { SlashCommandBuilder } from "@discordjs/builders";
import { NextPageButton, PreviousPageButton } from "@djs-button-pages/presets";
import { ButtonStyle } from "discord.js";
import { PaginationWrapper } from "djs-button-pages";
import { Bookmark } from "../models/Bookmark.js";
import { getEmbeds } from "../utils/common.js";

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
    const buttons = [
      new PreviousPageButton({
        custom_id: "prev_page",
        emoji: "◀",
        style: ButtonStyle.Secondary,
      }),
      new NextPageButton({
        custom_id: "next_page",
        emoji: "▶",
        style: ButtonStyle.Secondary,
      }),
    ];
    if (category) {
      const categoryList = await Bookmark.find({ category: category.value });

      const categoryFields = categoryList.map((item) => {
        return { name: `${item.desc}`, value: `${item.url}` };
      });

      const embeds = getEmbeds(categoryFields);

      if (categoryList.length === 0) {
        await interaction.reply({
          content: "Not found",
          ephemeral: true,
        });
      }

      const pagination = new PaginationWrapper()
        .setButtons(buttons)
        .setEmbeds(embeds)
        .setTime(60000);

      await pagination.interactionReply(interaction);
    }
    if (user) {
      const userList = await Bookmark.find({ author_id: user.value });

      const userFields = userList.map((item) => {
        return {
          name: `${item.desc}`,
          value: `category: *${item.category}* \n ${item.url}`,
        };
      });

      const embeds = getEmbeds(userFields);

      if (userList.length === 0) {
        return await interaction.reply({
          content: "Not found",
          ephemeral: true,
        });
      }

      const pagination = new PaginationWrapper()
        .setButtons(buttons)
        .setEmbeds(embeds)
        .setTime(60000);

      await pagination.interactionReply(interaction);
    }
    if (query) {
      const queryList = await Bookmark.aggregate().search({
        text: {
          query: query.value,
          path: "desc",
        },
      });

      const queryFields = queryList.map((item) => {
        return { name: `${item.desc}`, value: `${item.url}` };
      });
      if (queryList.length === 0) {
        return await interaction.reply({
          content: "Not found",
          ephemeral: true,
        });
      }

      const embeds = getEmbeds(queryFields);

      const pagination = new PaginationWrapper()
        .setButtons(buttons)
        .setEmbeds(embeds)
        .setTime(60000);

      await pagination.interactionReply(interaction);
    }
  },
};
