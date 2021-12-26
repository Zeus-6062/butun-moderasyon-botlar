
const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["seskontrol", "sk", "n","nerede"],
    name: "seskontrol",
    help: "seskontrol [kullanıcı]",
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmelisin.`))
  let kanal = member.voice.channel
  if(!kanal) return message.channel.send(embed.setDescription(`Belirttiğin kişi ses kanalında bulunmuyor.`))
  let microphone = member.voice.selfMute ? "Mikrofonu \`Kapalı\`" : "Mikrofonu \`Açık\`";
  let headphones = member.voice.selfDeaf ? "Kulaklığı \`Kapalı\`" : "Kulaklığı \`Açık\`";
  message.channel.send(embed.setDescription(`
${member} kişisi \`${kanal.name}\` kanalında.

${microphone} 
${headphones}`))
    }}