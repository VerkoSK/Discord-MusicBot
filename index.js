require("dotenv").config();
const { Intents } = require("discord.js");

const DiscordMusicBot = require("./structures/DiscordMusicBot");

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
];

const botconfig = require("./botconfig");
const client = new DiscordMusicBot({
  intents,
  token: botconfig.Token,
  prefix: botconfig.DefaultPrefix,
  adminIDs: botconfig.Admins,
  lavalink: botconfig.Lavalink,
});

client.RegisterSlashCommands();
client.build();

module.exports = client;
