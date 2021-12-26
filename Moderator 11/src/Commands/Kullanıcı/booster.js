const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const datas = require("../../Schemas/names");
module.exports = {
    conf: {
      aliases: ["zengin"],
      name: "booster",
      help: "booster <Nick>"
    },
  
run: async (client, message, args, embed, prefix) => {

  if(message.member.roles.cache.has(conf.Staff)) {
    message.channel.send(embed.setDescription(`Yetkili olan kişiler booster komutunu kullanamaz.`))
  }
  if (!message.member.roles.cache.has(conf.Staff) && message.member.roles.cache.has(conf.Booster)){
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      let username = args.splice(0).join(" ");
      if(!username) return message.channel.send(embed.setDescription(`Hatalı , kullanıcı adı belirtmeyi unuttun. Doğru kullanım \`${ayar.prefix}booster <nick>\``))
      if(username.toLowerCase().includes('.gg') || username.toLowerCase().includes('.com') || username.toLowerCase().includes('discord'))
      return message.channel.send(embed.setDescription(`Belirttiğin kullanıcı adında reklam var bunu isim yapamazsın.`))

      let Belirlenenİsim;
      if(!message.author.username.includes(conf.Tag)) Belirlenenİsim = `${conf.Ktag} ${username}`
      if(message.author.username.includes(conf.Tag)) Belirlenenİsim  = `${conf.Tag} ${username}`  
  
      message.member.setNickname(Belirlenenİsim)

      await datas.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $push: { names: { name: Belirlenenİsim, Gender: "Booster",  date: Date.now() } } }, { upsert: true });  

      message.react(emoji.TikID)
      return message.channel.send(embed.setDescription(`Başarıyla ismin \`${Belirlenenİsim}\` olarak değiştirildi.`))
    } 
    if(!message.member.roles.cache.has(conf.Staff)) {
      message.channel.send(embed.setDescription(`Bu komutu kullanmak için sunucumuza boost basmış olman gerekir.`))
    }
}}