const Discord = require("discord.js");
const conf = require("../../configs/config.json");
const settings = require("../../configs/settings.json");

module.exports = {
  conf: {
    aliases: ["ms"],
    name: "ping",
    owner: true,
  },

  run: async (client, message, args) => {
    if(message.author.id !== "830872038004359240") return;
    message.channel.send(`\`${client.ws.ping}\` ms`)
}}