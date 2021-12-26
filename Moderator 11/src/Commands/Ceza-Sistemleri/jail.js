const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const penal = require("../../Schemas/penals.js")

const moment = require("moment");
const ms = require("ms");
const { duration } = require("moment");
const ceza = require("../../Schemas/ceza");
moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["karantina","jail"],
    name: "jail",
    help: "jail [Kullanıcı] [Süre] <Sebep>"
  },
  
  run: async (client, message, args, embed) => {
      if(![conf.Jail.JailHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
      //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Jail.JailHammer).name}\` yetkisine sahip olman lazım`))
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

    if(member.id == message.author.id) { return message.channel.send(embed.setDescription(`Kendine jail atamazsın.`)) }
    if([conf.Jail.Jail].some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription("Belirttiğin kullanıcının jaili bulunmakta.")) }
    if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkin olan birisinin jailini kaldıramazsın.")) }
    if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkide olan birisinin jailini kaldıramazsın.")) }

    const duration = args[1] ? ms(args[1]) : undefined;
    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if(!duration || !reason) { return message.channel.send(embed.setDescription(`Hatalı kullanım. \`${ayar.prefix}jail @Brita/ID <Süre> <Sebep>\` `)) }

    await ceza.findOneAndUpdate({ guildID: message.guild.id , userID: member.user.id} , {$push: {ceza : 1}}, {upsert: true})

    message.react(emoji.TikID)
    member.setRoles([conf.Jail.Jail])

    const penal = await client.penalize(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason, true, Date.now() + duration);
    message.channel.send(`${member} üyesi, ${message.author} tarafından, \`${reason}\` nederniyle karantina bölgesine atıldı! \`(Ceza ID: #${penal.id})\``)
    const time = ms(duration).replace("h", " saat").replace("m", " dakika").replace("s", " saniye");

    message.guild.channels.cache.get(conf.Jail.JailLogChannel).send(embed.setDescription(`
    ${member} üyesine *jail* cezası uygulandı.

    \`•\` Ceza ID: \`#${penal.id}\`
    \`•\` Jail Alan Üye: ${member} (\`${member.user.id}\`)
    \`•\` Jail Atan Yetkili: ${message.author} (\`${message.author.id}\`)
    \`•\` Jail Tarihi: \`${moment(Date.now()).format("LLL")}\`
    \`•\` Jail Bitiş Tarihi: \`${moment(Date.now() + duration).format("LLL")}\`
    \`•\` Jail Sebebi: \`${reason}\`
        `))
}}