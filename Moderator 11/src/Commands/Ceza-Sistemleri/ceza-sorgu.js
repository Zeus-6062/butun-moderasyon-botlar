const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")

const moment = require("moment");
const penal = require("../../Schemas/penals")
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["ceza-sorgu","sorgu"],
    name: "cezasorgu",
    help: "cezasorgu"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

  if(isNaN(args[0])) return message.channel.send(embed.setDescription(`Girdiğin ceza ıd'si sadece sayı olması gerek.`))
  const data = await penal.findOne({ guildID: message.guild.id, id: args[0] });
  if (!data) return message.channel.send(`${args[0]} ID'li bir ceza bulunamadı!`).then(x=>x.delete({timeout:5000}))
  message.channel.send(embed.setDescription(`
 Cezayı Alan Kişi: <@${data.userID}> - (\`${data.userID}\`)
 Ceza Yeme Tarihi: \`${moment(data.date).format("LLL")}\`

 Ceza ID: \`#${data.id}\` 
 Durum : **${data.active ? "Devam Eden Ceza" : "Bitmiş Ceza"}** 
 Ceza Türü: \`[${data.type}]\`
 Yetkili: <@${data.staff}>
 Sebep: \`${data.reason}\`
 Aldığı Ceza: \`${data.type.toLowerCase().replace("-", " ")}\``));
  }}