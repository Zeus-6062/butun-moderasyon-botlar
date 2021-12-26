const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const kayıt = require("../../Schemas/kayıt")
const datas = require("../../Schemas/names")
const moment = require("moment")
moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["isimler"],
    name: "isim-sorgu",
    help: "isimler [Kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Register.RegisterHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    // return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Register.RegisterHammer).name}\` yetkisine sahip olman lazım`))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Hangi kullanıcının isim geçmişine bakacağını belirtmelisin \`${ayar.prefix}isimler @Brita/ID\``))

    let isimsorgu = await datas.findOne({guildID: message.guild.id, userID: member.user.id})
    if(!isimsorgu) { return message.channel.send(embed.setDescription(`Belirttiğin kullanıcının her hangi bir isim geçmişi bulunmuyor.`))}
    message.channel.send(embed.setDescription(`
    ${member} kullanıcısının isim kaydı bulundu:
    
    ${isimsorgu ? isimsorgu.names.splice(0, 20).map((x, i) => `\`${i + 1}.\` \`${x.name}\` **[${x.Gender}]**
    [<@${x.yetkili}>] , [\`${moment(x.date).format("LLL")}\`]`).join("\n**────────────────────────**\n") : ""}`))

}}