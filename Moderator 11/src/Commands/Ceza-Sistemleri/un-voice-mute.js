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
    aliases: ["vmute-kaldır","unvmute"],
    name: "unvmute",
    help: "unvmute [Kullanıcı] <Sebep>"
  },

  run: async (client, message, args, embed) => {
      if(![conf.Vmute.VmuteHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
      //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Vmute.VmuteHammer).name}\` yetkisine sahip olman lazım`))
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

    if(![conf.Vmute.Vmute].some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription("Belirttiğin kullanıcının voice mutesi bulunmamakta.")) }
    if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkin olan birisinin voice mutesini kaldıramazsın.")) }
    if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkide olan birisinin voice mutesini kaldıramazsın.")) }

    message.react(emoji.TikID)
    member.voice.setMute(false)
    member.roles.remove(conf.Vmute.Vmute);

    const data = await penal.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });

message.channel.send(`${member} üyesinin sesli kanallarda susturması, ${message.author} tarafından kaldırıldı!`)
message.guild.channels.cache.get(conf.Vmute.VmuteLogChannel).send(embed.setDescription(`
${member} üyesinin *voice mute* cezası kaldırıldı.

\`•\` VMutesi Kaldırılan Kişi: \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
\`•\` VMuteyi Kaldıran Yetkili: \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
\`•\` Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
      `))
  }}