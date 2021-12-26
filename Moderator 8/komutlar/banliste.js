const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cfg = require("../config.js");

module.exports.run = async(client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.yetki.banH) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  message.guild.fetchBans().then(bans => {
  if(bans.size >= 30){
  message.channel.send(embedvegas.setDescription(`Toplam "**${bans.size}**" adet yasaklanmış kullanıcı bulunuyor.\n\n${bans.size > 0 ? bans.map(z => `30 dan fazla banlanmış kullanıcı olduğu için banlananları gösteremiyorum.`).join("\n") : "Bu Sunucuda Mevcut Yasaklama Bulunmuyor."}`));
  }
  if(bans.size < 30){
  message.channel.send(embedvegas.setDescription(`Toplam "**${bans.size}**" adet yasaklanmış kullanıcı bulunuyor.\n\n ${bans.size > 0 ? bans.map(z => `${z.user.tag.replace("`", "")} - \`${z.user.id}\``).join("\n") : "Bu Sunucuda Mevcut Yasaklama Bulunmuyor."}`));
  }
  })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['Banliste','BANLİSTE','BanListe','banlist','Banlist','BanList'],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'banliste'
    
  }