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
    aliases: ["voice-mute","vmute"],
    name: "vmute",
    help: "vmute [Kullanıcı] [Süre] <Sebep>"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Vmute.VmuteHammer].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Vmute.VmuteHammer).name}\` yetkisine sahip olman lazım`))

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmen gerek.`))

  if(member.id == message.author.id) { return message.channel.send("Kendine voice mute atamazsın.") }
  if([conf.Vmute.Vmute].some(x => member.roles.cache.has(x))) { return message.channel.send(embed.setDescription("Voice Muteli olan birisini muteleyemezsin.")) }
  if(message.member.roles.highest.positon < member.roles.highest.positon) { return message.channel.send(embed.setDescription("Senin üst yetkindeki kişiye voice mute atamazsın.")) }
  if(message.member.roles.highest.positon = member.roles.highest.positon) { return message.channel.send(embed.setDescription("Seninle aynı yetkideki kişiye voice mute atamazsın.")) }
  if(!member.voice.channel) { return message.channel.send(embed.setDescription(`Voice Mute atacağın kişinin seste olması gerek`)) }

  const duration = args[1] ? ms(args[1]) : undefined;
  const reason = args.slice(2).join(" ") || "Belirtilmedi!";
  if(!reason || !duration) return message.channel.send(embed.setDescription(`Hatalı kullanım. ${ayar.prefix}vmute @Brita/ID <Süre> <Sebep>`))

  await ceza.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { ceza: 1 } }, { upsert: true });

  message.react(emoji.TikID)
  member.voice.setMute(true)
  member.roles.add(conf.Vmute.Vmute);

  const penal = await client.penalize(message.guild.id, member.user.id, "VOICE-MUTE", true, message.author.id, reason, true, Date.now() + duration);
  message.channel.send(`${member} üyesi, ${message.author} tarafından, \`${reason}\` nedeniyle ses kanallarında susturuldu! \`(Ceza ID: #${penal.id})\``)
  const time = ms(duration).replace("h", " saat").replace("m", " dakika").replace("s", " saniye");


message.guild.channels.cache.get(conf.Vmute.VmuteLogChannel).send(embed.setDescription(`
${member} üyesine *voice mute* cezası uygulandı.

\`•\` Ceza ID: \`#${penal.id}\`
\`•\` VMute Alan Üye: ${member} (\`${member.user.id}\`)
\`•\` VMute Atan Yetkili: ${message.author} (\`${message.author.id}\`)
\`•\` VMute Tarihi: \`${moment(Date.now()).format("LLL")}\`
\`•\` VMute Bitiş Tarihi: \`${moment(Date.now() + duration).format("LLL")}\`
\`•\` VMute Sebebi: \`${reason}\`
    `))

  }}