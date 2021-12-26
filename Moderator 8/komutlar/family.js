const Discord = require('discord.js')
const config = require('../config.js')
exports.run = async(client, message, args) => {

let arxemb = new Discord.MessageEmbed()
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.reply("Bir İD Veya Üye bulunumadı.").then(x => x.delete({timeout: 5000}))
member.roles.add(config.family)
message.channel.send(arxemb.setDescription(`${member} başarıyla ailemize katıldı.Hoşgeldin`))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["family"],
  permLevel: 0

}

exports.help = {
  name: "family"
};