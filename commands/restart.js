module.exports = {
    name: "restart",
    description: "Restart the bot",
    /**
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    async execute(client, message, args, { GuildDB }) {
      // Check if the command is used by the specified ID
      if (message.author.id !== "657629898961322048") {
        return message.channel.send("❌ | You don't have permission to use this command.");
      }
  
      try {
        await message.channel.send("Restarting the bot...");
        // Add any additional steps for restarting the bot here
        process.exit(); // Example code to terminate the process, causing the bot to restart
      } catch (error) {
        console.error(error);
        message.channel.send("❌ | An error occurred while restarting the bot.");
      }
    },
  };
  