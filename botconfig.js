const { Client } = require('discord.js');
const config = {
  Admins: [""],
  ExpressServer: true,
  DefaultPrefix: process.env.Prefix || "!",
  Port: 3000,
  SupportServer: "https://discord.gg/uHnwTYfVNq",
  Token: process.env.Token || "",
  ClientID: process.env.Discord_ClientID || "",
  ClientSecret: process.env.Discord_ClientSecret || "",
  Scopes: ["identify", "guilds", "applications.commands"],
  ServerDeafen: true,
  DefaultVolume: 100,
  CallbackURL: "/api/callback",
  "24/7": true,
  CookieSecret: "Verko is Best",
  IconURL: "",
  EmbedColor: "RANDOM",
  Permissions: 2205281600,
  Website: process.env.Website || "https://dellos.com",
  Presence: {
    status: "online",
    activities: [
      {
        name: "Music",
        type: "LISTENING",
      },
    ],
  },
  Lavalink: {
    id: "Main",
    host: "eu-lavalink.lexnet.cc",
    port: 443,
    pass: "lexn3tl@val!nk",
    secure: true,
    retryAmount: 200,
    retryDelay: 40,
  },
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "",
    ClientSecret: process.env.Spotify_ClientSecret || "",
  },
  endpoint: "",
};

const bot = new Client();

bot.once('ready', () => {
  console.log(`Bot sa úspešne pripojil s menom ${bot.user.tag}!`);
});

bot.login(config.Token);
