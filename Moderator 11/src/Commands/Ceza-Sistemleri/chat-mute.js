const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const ceza = require("../../Schemas/ceza.js")
const penal = require("../../Schemas/penals.js")
const moment = require("moment");
const ms = require("ms");
const { duration } = require("moment");
moment.locale("tr")
module.exports = {
  conf: {
    aliases: ["chat-mute","cmute"],
    name: "mute",
    help: "mute [Kullanıcı] [Süre] <Sebep>"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Mute.MuteHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Mute.MuteHammer).name}\` yetkisine sahip olman lazım`))

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

  if(member.id == message.author.id) { return message.channel.send("Kendine mute atamazsın.") }
  if([conf.Mute.ChatMute].some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription("Muteli olan birisini muteleyemezsin.")) }
  if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkindeki kişiye mute atamazsın.")) }
  if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkideki kişiye mute atamazsın.")) }

  const duration = args[1] ? ms(args[1]) : undefined;
  const reason = args.slice(2).join(" ") || "Belirtilmedi!";
  if(!reason || !duration) return message.channel.send(embed.setDescription(`Hatalı kullanım. ${ayar.prefix}mute @Brita/ID <Süre> <Sebep>`))

  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });

  message.react(emoji.TikID)
  member.roles.add(conf.Mute.ChatMute);

  const penal = await client.penalize(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
  message.channel.send(`${member} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle metin kanallarında susturuldu! \`(Ceza ID: #${penal.id})\``)
  const time = ms(duration).replace("h", " saat").replace("m", " dakika").replace("s", " saniye");


message.guild.channels.cache.get(conf.Mute.MuteLogChannel).send(embed.setDescription(`
${member} üyesine *chat mute* cezası uygulandı.

\`•\` Ceza ID: \`#${penal.id}\`
\`•\` Mute Alan Üye: ${member} (\`${member.user.id}\`)
\`•\` Mute Atan Yetkili: ${message.author} (\`${message.author.id}\`)
\`•\` Mute Tarihi: \`${moment(Date.now()).format("LLL")}\`
\`•\` Mute Bitiş Tarihi: \`${moment(Date.now() + duration).format("LLL")}\`
\`•\` Mute Sebebi: \`${reason}\`
    `))

  }}