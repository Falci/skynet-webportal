const { Client, MessageMentions } = require("discord.js");

const client = new Client();

const { DISCORD_BOT_TOKEN, PORTAL_NAME = "PORTAL_NAME not defined" } = process.env;

client.on("ready", () => {
  sendMessageToHealthCheckChannel(`${PORTAL_NAME}: reporting for duty!`);
});

(async () => {
  if (!DISCORD_BOT_TOKEN) {
    console.log(`DISCORD_BOT_TOKEN environment variable not available, skipping discord integration`);
    return;
  }

  try {
    await client.login(DISCORD_BOT_TOKEN);
  } catch (error) {
    console.log(`Could not connect to discord server: ${error.message}`);
  }
})();

function sendMessage(message, channelName) {
  const channel = client.channels.cache.find((channel) => channel.name === channelName);

  if (!channel) {
    console.log(`Channel ${channelName} not found!`);

    return;
  }

  channel.send(message);
}

function sendMessageToHealthCheckChannel(message) {
  return sendMessage(message, "skynet-portal-health-check");
}

function getGuildByName(guildName) {
  return client.guilds.cache.find(({ name }) => name === guildName);
}

function getRoleByName(roleName) {
  const guild = getGuildByName("Nebulous");

  return guild.roles.cache.find(({ name }) => name === roleName);
}

module.exports = { sendMessage, sendMessageToHealthCheckChannel, getGuildByName, getRoleByName };
