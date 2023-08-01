const fs = require("fs");
const path = require("path");

/**
 * Register slash commands for a guild
 * @param {require("../structures/DiscordMusicBot")} client
 * @param {string} guildId
 */
module.exports = async (client, guildId) => {
  client.log("Registering slash commands for guild: " + guildId);

  let commandsDir = path.join(__dirname, "..", "commands");

  try {
    const guild = await client.guilds.fetch(guildId);
    const clientAPI = guild.api.applications(client.user.id);

    fs.readdir(commandsDir, async (err, files) => {
      if (err) throw err;

      for (const file of files) {
        let cmd = require(path.join(commandsDir, file));

        if (!cmd.name || !cmd.description || !cmd.SlashCommand || !cmd.SlashCommand.run) continue;

        let dataStuff = {
          name: cmd.name,
          description: cmd.description,
          options: cmd.SlashCommand.options,
        };

        client.log(
          "[Slash Command]: [POST] Guild " + guildId + ", Command: " + dataStuff.name
        );

        try {
          await clientAPI.commands.post({ data: dataStuff });
        } catch (e) {
          client.log(
            "[Slash Command]: [POST-FAILED] Guild " + guildId + ", Command: " + dataStuff.name
          );
          console.log(e);
        }
      }
    });
  } catch (error) {
    client.log("Error registering slash commands:", error);
  }
};
