const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const ms = require("ms")
const cfg = require("../config.js");
const moment = require("moment")
require("moment-duration-format")

module.exports.run = function(client, message, args) {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.yetki.register) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(m => m.delete({timeout: 5000}), message.react(cfg.react.red))
  let sayi = 1                                
  let map = message.guild.members.cache.filter(mem => !mem.user.bot).array().sort((a, b) => { return ( db.fetch(`toplamkayıt.${b.user.id}`) || 0) - ( db.fetch(`toplamkayıt.${a.user.id}`) || 0)  }).slice(0, 20).map(member => { return `\`${sayi++}.\` <@${member.user.id}>: Toplam Kayıtları: \`${( db.fetch(`toplamkayıt.${member.user.id}`) || 0)}\` (\`${( db.fetch(`erkekkayıt.${member.user.id}`) || 0)}\` Erkek , \`${( db.fetch(`kızkayıt.${member.user.id}`) || 0)}\` Kadın)`}).join("\n")
  const vegas = new MessageEmbed()
  .setDescription(map)
  .setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true}))
  .setColor(`2f3136`)
  message.channel.send(vegas);
  message.react(cfg.react.tik)
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıttop','Topkayıt','Kayıttop','TOPKAYIT'],
    permLevel: 0,
  }
  
  exports.help = {
    name: "topkayıt",
    
  }