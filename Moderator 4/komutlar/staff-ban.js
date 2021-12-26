const discord = require('discord.js');
const db = require('quick.db');
const ayar = require('../ayarlar.json');
const moment = require('moment');
const ms = require('ms');
exports.run = function(client, message,args) {

  const kisi = message.mentions.users.first()
  let sebep = args[1] || "Sebep belirtilmedi"
  if (!kisi) return message.channel.send("Banlamak için kişi belirle.").then(s => s.delete({ timeout: 3456 }))

  if(!message.member.hasPermission("KICK_MEMBERS")) return message.react(ayar.carpi)

  let cezaID = db.get(`cezaid.${message.guild.id}`) + 1

  const embed = new discord.MessageEmbed()
.setColor('8b0000')
.setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
.setDescription(`
${kisi} (\`${kisi.id}\`) adlı kullanıcı sunucudan yasaklandı.

• Yetkili: <${message.author.id}> (\`${message.author.id}\`)
• Yasaklanma Tarihi: ${new Date().toTurkishFormatDate()}

• Sebep: \`${sebep}\`
• Ceza ID : \`#${cezaID}\`
`)

   message.guild.members.ban(kisi) 
                 db.add(`banAtma.${message.author.id}`, 1)
                 db.add(`banAlma.${kisi.id}`, 1)
   message.channel.send(embed).then(s => s.delete({ timeout: 30000 }))
   message.guild.channels.cache.get(ayar.banLog)

};

exports.conf = {
  aliases: ["yasakla","ban"]
};

exports.help = {
  name: 'ban',
  description: 'Kullanıcıyı sunucudan yasaklar.'
}