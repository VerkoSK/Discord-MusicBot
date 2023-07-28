const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");
const os = require("os");
const netstat = require("netstat");

module.exports = {
  name: "stats",
  description: "Get information about the bot",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["about", "ping", "info"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(message.client.uptime)
        .format(" D[d], H[h], m[m]");

      const embed = new MessageEmbed();
      embed.setColor(client.botconfig.EmbedColor);
      embed.setTitle(`Stats from \`${client.user.username}\``);
      embed.addFields(
        {
          name: ":ping_pong: Ping",
          value: `┕\`${Math.round(client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: ":clock1: Uptime",
          value: `┕\`${duration}\``,
          inline: true,
        },
        {
          name: ":file_cabinet: Memory",
          value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb\``,
          inline: true,
        },
        {
          name: ":homes: Servers",
          value: `┕\`${client.guilds.cache.size}\``,
          inline: true,
        },
        {
          name: ":busts_in_silhouette: Users",
          value: `┕\`${client.users.cache.size}\``,
          inline: true,
        },
        {
          name: ":control_knobs: API Latency",
          value: `┕\`${message.client.ws.ping}ms\``,
          inline: true,
        },
        {
          name: ":speech_balloon: Text Channels",
          value: `┕\`${client.channels.cache.filter(channel => channel.type === "text").size}\``,
          inline: true,
        },
        {
          name: ":microphone2: Voice Channels",
          value: `┕\`${client.channels.cache.filter(channel => channel.type === "voice").size}\``,
          inline: true,
        },
        {
          name: ":card_box: Categories",
          value: `┕\`${client.channels.cache.filter(channel => channel.type === "category").size}\``,
          inline: true,
        },
        {
          name: ":lock: Roles",
          value: `┕\`${client.guilds.cache.get(message.guild.id).roles.cache.size}\``,
          inline: true,
        },
        {
          name: ":smile: Emojis",
          value: `┕\`${client.guilds.cache.get(message.guild.id).emojis.cache.size}\``,
          inline: true,
        },
        {
          name: ":robot: Version",
          value: `┕\`v${require("../package.json").version}\``,
          inline: true,
        },
        {
          name: ":blue_book: Discord.js",
          value: `┕\`v${version}\``,
          inline: true,
        },
        {
          name: ":green_book: Node",
          value: `┕\`${process.version}\``,
          inline: true,
        }
      );

      // Get network stats
      netstat.stats().then((stats) => {
        const networkInterface = os.networkInterfaces().lo[0]; // Replace 'lo' with the interface you want to monitor

        if (networkInterface) {
          const upload = (networkInterface.tx / 1024 / 1024).toFixed(2);
          const download = (networkInterface.rx / 1024 / 1024).toFixed(2);

          embed.addFields(
            {
              name: ":arrow_up: Network Upload",
              value: `┕\`${upload}mb\``,
              inline: true,
            },
            {
              name: ":arrow_down: Network Download",
              value: `┕\`${download}mb\``,
              inline: true,
            }
          );
        }

        message.channel.send(embed);
      });
    });
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction) => {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D[d], H[h], m[m]");

        const embed = new MessageEmbed();
        embed.setColor(client.botconfig.EmbedColor);
        embed.setTitle(`Stats from \`${client.user.username}\``);
        embed.addFields(
          {
            name: ":ping_pong: Ping",
            value: `┕\`${Math.round(client.ws.ping)}ms\``,
            inline: true,
          },
          {
            name: ":clock1: Uptime",
            value: `┕\`${duration}\``,
            inline: true,
          },
          {
            name: ":file_cabinet: Memory",
            value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``,
            inline: true,
          },
          {
            name: ":homes: Servers",
            value: `┕\`${client.guilds.cache.size}\``,
            inline: true,
          },
          {
            name: ":busts_in_silhouette: Users",
            value: `┕\`${client.users.cache.size}\``,
            inline: true,
          },
          {
            name: ":control_knobs: API Latency",
            value: `┕\`${client.ws.ping}ms\``,
            inline: true,
          },
          {
            name: ":speech_balloon: Text Channels",
            value: `┕\`${client.channels.cache.filter(channel => channel.type === "text").size}\``,
            inline: true,
          },
          {
            name: ":microphone2: Voice Channels",
            value: `┕\`${client.channels.cache.filter(channel => channel.type === "voice").size}\``,
            inline: true,
          },
          {
            name: ":card_box: Categories",
            value: `┕\`${client.channels.cache.filter(channel => channel.type === "category").size}\``,
            inline: true,
          },
          {
            name: ":lock: Roles",
            value: `┕\`${client.guilds.cache.get(interaction.guild.id).roles.cache.size}\``,
            inline: true,
          },
          {
            name: ":smile: Emojis",
            value: `┕\`${client.guilds.cache.get(interaction.guild.id).emojis.cache.size}\``,
            inline: true,
          },
          {
            name: ":robot: Version",
            value: `┕\`v${require("../package.json").version}\``,
            inline: true,
          },
          {
            name: ":blue_book: Discord.js",
            value: `┕\`v${version}\``,
            inline: true,
          },
          {
            name: ":green_book: Node",
            value: `┕\`${process.version}\``,
            inline: true,
          }
        );

        // Get network stats
        netstat.stats().then((stats) => {
          const networkInterface = os.networkInterfaces().lo[0]; // Replace 'lo' with the interface you want to monitor

          if (networkInterface) {
            const upload = (networkInterface.tx / 1024 / 1024).toFixed(2);
            const download = (networkInterface.rx / 1024 / 1024).toFixed(2);

            embed.addFields(
              {
                name: ":arrow_up: Network Upload",
                value: `┕\`${upload}mb\``,
                inline: true,
              },
              {
                name: ":arrow_down: Network Download",
                value: `┕\`${download}mb\``,
                inline: true,
              }
            );
          }

          interaction.send(embed);
        });
      });
    },
  },
};
