const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
 
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.react(ayarlar.carpi)
  
 
      if (!args[0])
      return message.channel.send(
        `Yavaş modu ayarlamam için bir sayı yazmalısın!`
      ).then(j => j.delete({ timeout: 2345 }))
  if (args[0] > 1000) return message.channel.send("Slowmode en fazla 1000 olabilir.").then(v => v.delete({ timeout: 2345 }))
    if (isNaN(args[0])) return message.channel.send(`Bu bir sayı değil!`).then(l => l.delete({ timeout: 2345 }))
    let reason = message.content.slice(args[0]);
    if (!reason) {
      reason == "31";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(
      `**${args[0]}** Saniye!.`
    ).then(h => h.delete({ timeout: 2345 }))
 
};
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slow-mode", "yavaşmod", "yavas-mod", 'yavasmod', 'yavaşmod','ym'],
  permLevel: 0
};

exports.help = {
 name: 'slowmode',
 description:"Kanalın mesaj gönderme hızını ayarlar."
};