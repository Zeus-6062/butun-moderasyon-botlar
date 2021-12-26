const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const penal = require("../../Schemas/penals.js")

const moment = require("moment");
const ms = require("ms");
const { duration } = require("moment");
moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["mute-kaldır","unmute"],
    name: "uncmute",
    help: "unmute [Kullanıcı] <Sebep>"
  },

  run: async (client, message, args, embed) => {
      if(![conf.Mute.MuteHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
      //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Mute.MuteHammer).name}\` yetkisine sahip olman lazım`))
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

    if(![conf.Mute.ChatMute].some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription("Belirttiğin kullanıcının mutesi bulunmamakta.")) }
    if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkin olan birisinin mutesini kaldıramazsın.")) }
    if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkide olan birisinin mutesini kaldıramazsın.")) }

    message.react(emoji.TikID)
    member.roles.remove(conf.Mute.ChatMute);
    
    const data = await penal.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });

message.channel.send(`${member} üyesinin metin kanallarında susturması, ${message.author} tarafından kaldırıldı!`)
message.guild.channels.cache.get(conf.Mute.MuteLogChannel).send(embed.setDescription(`
${member} üyesinin *chat mute* cezası kaldırıldı.

\`•\` Mutesi Kaldırılan Kişi: \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
\`•\` Muteyi Kaldıran Yetkili: \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
\`•\` Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
      `))
  }}