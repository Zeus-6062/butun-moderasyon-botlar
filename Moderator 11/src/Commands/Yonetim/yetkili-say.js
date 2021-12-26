const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")

module.exports = {
  conf: {
    aliases: ["yetkili","staff"],
    name: "yetkili",
    help: "yetkili <Online / Offline>"
  },

  run: async (client, message, args, embed) => {
    if(![conf.UstStaff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.UstStaff).name}\` yetkisine sahip olman lazım`))
 
    let x = args[0];
    if(!x) return message.channel.send(embed.setDescription(`Bir işlem belirtiniz. \`${ayar.prefix}yetkili online / offline\` `)).catch(e => { })
   
    if(x === "online") {
    let low = message.guild.roles.cache.get(conf.Staff)
    let user = message.guild.members.cache.filter(member => member.roles.highest.position >= low.position && member.presence.status !== "offline" && !member.user.bot);
    let novoice = user.filter(member => !member.voice.channel)

    if(novoice < 1 ) return message.channel.send(embed.setDescription(`Yetkililerin Hepsi Seste.`))
    return message.channel.send(`
Online Olup Seste *Olmayan* Yetkililer
${novoice.map(x => `<@${x.id}>`).join(" , ")}`)
}

    if(x === "offline") {
    let low = message.guild.roles.cache.get(conf.Staff)
    let user = message.guild.members.cache.filter(member => member.roles.highest.position >= low.position && !member.voice.channel && member.presence.status === "offline" && !member.user.bot)
    let novoice = user.filter(member => !member.voice.channel)

    if(novoice < 1 ) return message.channel.send(embed.setDescription(`Yetkililerin Hepsi Seste.`))
    return message.channel.send(`
Online Olup Seste *Olmayan* Yetkililer
${novoice.map(x => `<@${x.id}>`).join(" , ")}`)
}
  }}