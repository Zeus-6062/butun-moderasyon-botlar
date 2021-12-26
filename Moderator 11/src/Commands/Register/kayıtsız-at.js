const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json");
const { MessageFlags } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["kayıt-sil"],
    name: "kayıtsız",
    help: "kayıtsız [Kullanıcı]"
  },

  run: async (client, message, args, embed) => {
      if(![conf.Register.RegisterHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
      //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Register.RegisterHammer).name}\` yetkisine sahip olman lazım`))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

    if(member.id == message.author.id) { return message.channel.send(embed.setDescription(`Kendini kayıtsıza atamazsın.`)) }
    if(member.roles.cache.has(conf.Register.UnregRole)) { return message.channel.send(embed.setDescription(`Kayıtsızda olan birisini kayıtsıza atamazsın.`))}
    if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription(`Kendinden üst yetkideki kişileri kayıtsıza atamazsın.`)) }
    if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription(`Kendinden aynı yetkideki kişileri kayıtsıza atamazsın.`)) }

    member.roles.cache.has(conf.Booster) ? member.roles.set([conf.Booster, conf.Register.UnregRole]).catch() : member.roles.set([conf.Register.UnregRole]).catch()
    member.setNickname(`${conf.Ktag} İsim ' Yaş`)
    if(member.voice.channel) member.voice.kick()

    message.channel.send(embed.setDescription(`${member} isimli kullanıcı <@${message.author.id}> isimli yetkili tarafından kayıtsıza atıldı.`))
    
}}