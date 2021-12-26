const Discord = require("discord.js")
const ayar = require('../config.js')
const db = require("quick.db")
const moment = require('moment')
const ms = require('ms')

module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.get(ayar.jailhammer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Üye Girmelisin \n Örnek Kullanım:`.jail Relly/ID`"))

if(uye.roles.cache.has(ayar.cezalırol)) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Üyeyi Bir Daha Cezalıya Atamazsın!"))

    if(message.author.id === uye.user.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Kendini Jail'e atamazsın.")).then(msg => msg.delete(9000))

let reason = args.slice(1).join(' ') || "Sebep Belirtilmemiş."
if(!reason) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Sebep Girmelsin!"))

let embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
.setDescription(`${uye} üyesi, ${message.author} Tarfından Jail Atıldı Sebep: ${reason}`)
message.channel.send(embed)
  db.set(`jail_${message.guild.id}_${uye.id}` , 'var')     
db.add('id',1)
let açılma_zamanı = Date.now()

  message.guild.members.cache.get(uye.id).roles.cache.forEach(r => {
message.guild.members.cache.get(uye.id).roles.remove(r) 

uye.roles.add(ayar.cezalırol);
  })
  
const jaillogs = new Discord.WebhookClient(ayar.jaillogid, ayar.jaillogtoken)

let jailid = db.fetch('id')
let embed1 = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
.setDescription(`${uye} üyesi, ${message.author} Tarafından Jaile Atıldı (Ceza Numarası: \`#${jailid-(-1)}\`)

\`▸ Atılış Tarihi:\` ${moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')}
\`▸ Sebep:\` ${reason}

`)


jaillogs.send(embed1)
  db.push(`kullanici.${uye.id}.cezabilgi`, {
  Ceza: "Cezalı",
  Sebep: reason,
  Yetkili: message.author.id
});
uye.roles.add(ayar.cezalırol);

};

exports.conf = {
  aliases: ['cezalı'],
  permLevel: 0
};

exports.help = {
  name: 'jail'
}; 