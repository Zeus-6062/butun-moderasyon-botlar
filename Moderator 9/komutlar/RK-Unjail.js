const { MessageEmbed } = require("discord.js");
const ayar = require("../config.js")

module.exports.run = async (client, message, args) => {
  
  if (!message.member.roles.cache.has(ayar.jailhammer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send(new MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Üye Girmelisin \n Örnek Kullanım:`.unjail Relly/ID`"))                                     
 
  let embed = new MessageEmbed()
 .setColor('RANDOM')
 .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
 .setDescription(`${uye} üyesinin, ${message.author} tarafından jaili kaldırıldı!`)
 message.channel.send(embed)
 
 
message.guild.members.cache.get(uye.id).roles.cache.forEach(r => {
message.guild.members.cache.get(uye.id).roles.remove(r) 
uye.roles.add(ayar.unregister1);
  })
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unjail"],
  permLevel: 0,
}

exports.help = {
  name: "unjail"
};