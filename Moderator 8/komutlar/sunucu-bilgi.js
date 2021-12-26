const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const qdb = require("quick.db");
const ayar = require("../config.js")
// module.exports.onLoad = (client) => {}
module.exports.run = async (client, message, args) => {
  let ekipRolu = ayar.ekipRolu || undefined;
  let boosterRolu = ayar.booster || undefined;
  const embed = new MessageEmbed().setTimestamp().setColor('RANDOM').setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
  .setDescription(`**Toplam Üye:** ${message.guild.memberCount}\n**Aktif Üye:** ${message.guild.members.cache.filter(u => u.presence.status != "offline").size}\n**Kanallar:** ${message.guild.channels.cache.size} (${message.guild.channels.cache.filter(c => c.type === "text").size} yazı, ${message.guild.channels.cache.filter(c => c.type === "voice").size} yazı)\n**Roller:** ${message.guild.roles.cache.size}\n**Oluşturulma Tarihi:** ${moment(message.guild.createdAt).format('DD/MM/YYYY HH.mm.ss')}`);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucu-bilgi"],
  permLevel: 0,
}

exports.help = {
  name: 'sunucubilgi'
  
}