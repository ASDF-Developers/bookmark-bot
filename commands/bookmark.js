import { SlashCommandBuilder } from "@discordjs/builders";
import { Bookmark } from "../models/Bookmark.js";

export default {
  data: new SlashCommandBuilder()
    .setName("bookmark")
    .setDescription("create bookmark")
    .addStringOption((option) =>
      option.setName("url").setDescription("url").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("bookmark description")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("bookmark category")
        .addChoices(
          { name: "Flutter", value: "flutter" },
          { name: "Javascript", value: "javascript" },
          { name: "Useful", value: "useful" },
          { name: "Tool", value: "tool" },
          { name: "Article", value: "article" },
          { name: "Newbie Useful", value: "newbiebuseful" },
          { name: "Video", value: "video" },
          { name: "Python", value: "python" },
          { name: "AI", value: "ai" }
        )

        .setRequired(true)
    ),
  run: async (client, interaction) => {
    const url = interaction.options.get("url");
    const category = interaction.options.get("category");
    const description = interaction.options.get("description");
    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const regularExp = new RegExp(urlRegex);

    if (regularExp.test(url.value)) {
      const newBookmark = new Bookmark({
        author_id: interaction.user.id,
        category: category.value,
        url: url.value,
        desc: description.value,
      });
      newBookmark.save();
      await interaction.reply({
        content: `Bookmark created. link: ${url.value}`,
        ephemeral: true,
      });
    }
  },
};
