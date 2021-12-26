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
    aliases: ["jail-kaldır","un-jail"],
    name: "unjail",
    help: "unjail [Kullanıcı] <Sebep>"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Jail.JailHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Jail.JailHammer).name}\` yetkisine sahip olman lazım`))

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

  if(![conf.Jail.Jail].some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription("Belirttiğin kullanıcının jaili bulunmamakta.")) }
  if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkin olan birisinin jailini kaldıramazsın.")) }
  if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkide olan birisinin jailini kaldıramazsın.")) }

  message.react(emoji.TikID)
  member.setRoles(conf.Register.UnregRole)

  const data = await penal.findOne({ userID: member.user.id, guildID: message.guild.id, type: "JAIL", active: true });

message.channel.send(`${member} üyesinin karantina cezası, ${message.author} tarafından kaldırıldı!`)
message.guild.channels.cache.get(conf.Vmute.VmuteLogChannel).send(embed.setDescription(`
${member} üyesinin *karantina* cezası kaldırıldı.

\`•\` Jail Kaldırılan Kişi: \`(${member.user.username.replace(/\`/g, "")} - ${member.user.id})\`
\`•\` Jail Kaldıran Yetkili: \`(${message.author.username.replace(/\`/g, "")} - ${message.author.id})\`
\`•\` Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
    `))
}}