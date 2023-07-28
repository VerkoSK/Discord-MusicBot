const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
  name: "lyrics",
  description: "Shows the lyrics of the searched song",
  usage: "[Song Name]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ly"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    let songTitle = args.join(" ");
    let searchString = args.join(" ");
    if (!args[0] && !player)
      return client.sendTime(
        message.channel,
        "❌ | **Nothing is currently playing...**"
      );
    if (!args[0]) songTitle = player.queue.current.title;
    songTitle = songTitle.replace(
      /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
      ""
    );

    let lyrics = await lyricsFinder(songTitle);
    if (!lyrics)
      return client.sendTime(
        message.channel,
        `**No lyrics found for -** \`${songTitle}\``
      );
    lyrics = lyrics.split("\n"); // Split into lines
    let splitLyrics = _.chunk(lyrics, 40); // 40 lines per page

    let pages = splitLyrics.map((ly) => {
      let embed = new MessageEmbed()
        .setAuthor(`Lyrics for: ${songTitle}`, client.botconfig.IconURL)
        .setColor(client.botconfig.EmbedColor)
        .setDescription(ly.join("\n"));

      if (args.join(" ") !== songTitle)
        embed.setThumbnail(player.queue.current.displayThumbnail());

      return embed;
    });

    if (!pages.length || pages.length === 1)
      return message.channel.send(pages[0]);
    else return client.Pagination(message, pages);
  },

  SlashCommand: {
    options: [
      {
        name: "song",
        description: "Enter the name of the song to search",
        type: 3,
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);

      if (!interaction.data.options && !player)
        return client.sendTime(
          interaction,
          "❌ | **Nothing is currently playing...**"
        );

      let songTitle = interaction.data.options
        ? interaction.data.options[0].value
        : player.queue.current.title;
      let lyrics = await lyricsFinder(songTitle);
      console.log(lyrics.length === 0);
      if (!lyrics || lyrics.length === 0)
        return client.sendTime(
          interaction,
          `**No lyrics found for -** \`${songTitle}\``
        );
      lyrics = lyrics.split("\n"); // Split into lines
      let splitLyrics = _.chunk(lyrics, 40); // 40 lines per page

      let pages = splitLyrics.map((ly) => {
        let embed = new MessageEmbed()
          .setAuthor(`Lyrics for: ${songTitle}`, client.botconfig.IconURL)
          .setColor(client.botconfig.EmbedColor)
          .setDescription(ly.join("\n"));

        if (songTitle !== player.queue.current.title)
          embed.setThumbnail(player.queue.current.displayThumbnail());

        return embed;
      });

      if (!pages.length || pages.length === 1)
        return interaction.send(pages[0]);
    },
  },
};
