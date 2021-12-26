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
    aliases: ["ban"],
    name: "ban",
    help: "ban [Kullanıcı] <Sebep>"
  },
  
  run: async (client, message, args, embed) => {
      if(![conf.Ban.BanHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
      //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Jail.JailHammer).name}\` yetkisine sahip olman lazım`))
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

    if(member.id == message.author.id) { return message.channel.send(embed.setDescription(`Kendine ban atamazsın.`)) }
    if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkin olan birisinin banını kaldıramazsın.")) }
    if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkide olan birisinin banını kaldıramazsın.")) }
    const ban = await client.fetchBan(message.guild.id , args[0]);
    if(ban) { return message.channel.send(embed.setDescription(`Belirtilen üye zaten banlı.`)) }

    const reason = args.slice(2).join(" ") || "Belirtilmedi!";
    if(!reason) { return message.channel.send(embed.setDescription(`Hatalı kullanım. \`${ayar.prefix}Ban @Brita/ID <Süre> <Sebep>\` `)) }

    await ceza.findOneAndUpdate({ guildID: message.guild.id , userID: member.user.id} , {$push: {ceza : 1}}, {upsert: true})

    message.react(emoji.TikID)
    message.guild.members.ban(user.id, { reason }).catch(() => {});

    const penal = await client.penalize(message.guild.id, member.user.id, "BAN", true, message.author.id, reason);
    message.channel.send(`${member} üyesi, ${message.author} tarafından, \`${reason}\` nederniyle sunududan banlandı! \`(Ceza ID: #${penal.id})\``)
    const time = ms(duration).replace("h", " saat").replace("m", " dakika").replace("s", " saniye");

    message.guild.channels.cache.get(conf.Ban.BanLogChannel).send(embed.setDescription(`
    ${member} üyesine *ban* cezası uygulandı.

    \`•\` Ceza ID: \`#${penal.id}\`
    \`•\` Ban Alan Üye: ${member} (\`${member.user.id}\`)
    \`•\` Ban Atan Yetkili: ${message.author} (\`${message.author.id}\`)
    \`•\` Ban Yeme Tarihi: \`${moment(Date.now()).format("LLL")}\`
    \`•\` Ban Sebebi: \`${reason}\`
        `))
}}