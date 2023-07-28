require("dotenv").config();
const { GatewayIntentBits } = require("discord.js");
const DiscordMusicBot = require("./structures/DiscordMusicBot"); // Použite správnu cestu k súboru DiscordMusicBot.js.

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
];

const client = new DiscordMusicBot({
  intents,
});

// Přidáme volání funkce RegisterSlashCommands pro registraci Slash Commandů
client.RegisterSlashCommands();

// Spustíme bota
client.build();

module.exports = client;
