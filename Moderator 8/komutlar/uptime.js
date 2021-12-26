const { Discord, MessageEmbed } = require('discord.js')

module.exports.run  = async (client ,message,args ) => {

const uptime = {
gün: Math.floor(client.uptime / 86400000),
saat: Math.floor(client.uptime / 3600000) % 24,
dakika: Math.floor(client.uptime / 60000) % 60,
saniye: Math.floor(client.uptime / 1000) % 60,
}
const uptime_embed = new MessageEmbed()
.setDescription(`${uptime.gün} gün ${uptime.saat} saat ${uptime.dakika} dakika ${uptime.saniye} saniye`)
.setColor('BLACK')
.setFooter('Relly');
message.channel.send(uptime_embed);
}
 exports.conf = {
    aliases: ["uptime","çalışmasüre","çalışma"],
  };
  
  exports.help = {
    name: "uptime",
  };
  