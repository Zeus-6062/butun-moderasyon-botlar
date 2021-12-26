const { MessageEmbed } = require("discord.js");
const cfg = require("../config.js");

module.exports.run = (client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(m => m.delete({timeout: 5000}), message.react(cfg.react.red))
  let kullanici =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  if (!kullanici) return message.channel.send(vegasembed.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if (kullanici.user.bot)  return message.channel.send(vegasembed.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(m => m.delete({timeout: 5000}), message.react(cfg.react.red))
  if(kullanici.id == (`${message.author.id}`)) return message.channel.send(vegasembed.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(m => m.delete({timeout: 5000}), message.react(cfg.react.red))
  
  if(!kullanici.roles.cache.has(cfg.other)) { 
  kullanici.roles.add(cfg.roles.vip)
  let recp = new MessageEmbed()
  .setColor(`RANDOM`)
  .setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true}))
  .setDescription(`<@${kullanici.id}> kişisine vip rolü verildi.`)
  message.channel.send(recp).then(m => m.delete({timeout: 5000}));
  message.react(cfg.react.tik)
  }
  
  if(kullanici.roles.cache.has(cfg.roles.vip)) { 
  kullanici.roles.remove(cfg.roles.vip)
  let vegas = new MessageEmbed()
  .setColor(`RANDOM`)
  .setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true}))
  .setDescription(`<@${kullanici.id}> kişisinden vip rolü alındı.`)
  message.channel.send(vegas).then(m => m.delete({timeout: 5000}));
  message.react(cfg.react.tik)
  }
  
}   
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['VIP','VİP','Vıp','viaypi','vıp'],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'vip'
    
  }