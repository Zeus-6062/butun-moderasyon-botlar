const Discord = require('discord.js')
const ms = require("ms");
const db = require("quick.db");
const conf = require('../ayarlar.json');
const moment = require('moment-duration-format');

exports.run = async (client, message, args) => {

const kdb = new db.table("ceza")

if(!message.member.roles.cache.has(conf.muteH) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.carpi)
let kullanıcı = message.mentions.users.first()
let cezaID = db.get(`cezaid.${message.guild.id}`) + 1

if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Bir kullanıcı etiketlemelisin.`))
if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed() .setDescription(`**${args[0]}**, kişisini sunucuda bulamıyorum.`))
  
if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Mutenin ne kadar kalacağını belirtmelisin.`))
let süre = args[1];

if(!args[2]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Mutelemek için bir sebep girmelisin.`))
let sebep = args[2]

message.guild.members.cache.get(kullanıcı.id).roles.add(conf.mutedRol)
db.add(`cezaid.${message.guild.id}`, +1)
let baslangic = Date.now()
let bitis = Date.now() + ms(süre)

let mbd = new Discord.MessageEmbed()
.setColor("8b0000")
.setAuthor(`${message.member.user.username}`, message.member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`
${kullanıcı} (\`${kullanıcı.id}\`) adlı kullanıcı metin kanallarında susturuldu.

• Yetkili: <@${message.author.id}>
• Susturma Tarihi: \`${new Date().toTurkishFormatDate()}\`
• Süre: \`${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')}\`

• Susturma Sebebi: \`${sebep}\`
• Ceza ID: \`#${cezaID}\`
`);

db.add(`CmAtma.${message.author.id}`, 1)
db.add(`cezapuan.${kullanıcı.id}`, 10)
db.add(`CmAlma.${kullanıcı.id}`, 1)
kdb.push(`sicil.${kullanıcı.id}`, {
    userID: kullanıcı.id,
    adminID: message.author.id, 
    Tip: "CMUTE", 
    start: new Date(), 
    cezaID: cezaID })

    let sonceza = kdb.fetch(`sonceza.${kullanıcı.id}`)

    if(sonceza) return kdb.delete(`sonceza.${kullanıcı.id}`)

    if(!sonceza) {

setTimeout(async() => {

      await kdb.push(`sonceza.${kullanıcı.id}`, {
      userID: kullanıcı.id,
      adminName: message.member.displayName, 
      Tip: "CMUTE", 
      start: new Date(),
      puan: "10",
      reason: sebep,
      cezaID: cezaID })
      }, 1500)  
    }

    db.add(`YetkiliPuan.${message.author.id}`, 8)
let cezapuan = db.fetch(`cezapuan.${kullanıcı.id}`)
client.channels.cache.get("848995124041220137").send(`**${kullanıcı}** aldığı \`#${cezaID+1}\` numaralı ceza ile **${cezapuan}** ceza puanına ulaştı. (\`10\`)`)

let mutelogh = client.channels.cache.get(conf.muteLog)
client.channels.cache.get(mutelogh.id).send(mbd)

setTimeout(async () =>{  
message.guild.members.cache.get(kullanıcı.id).roles.remove(conf.mutedRol)
client.channels.cache.get(mutelogh.id).send(new Discord.MessageEmbed()
.setAuthor(`${message.member.user.username}`, message.member.user.displayAvatarURL({ dynamic: true }))
.setColor("GREEN")
.setDescription(`
${kullanıcı} (\`${kullanıcı.id}\`) üyesinin metin kanallarındaki cezası kalktı.
• Yetkili: <@${message.author.id}>
• Susturulma Tarihi: \`${new Date().toTurkishFormatDate()}\`
• Süre: \`${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')}\`

• **Susturma Sebebi** : \`${sebep}\`
• **Ceza ID** : \`#${cezaID}\`
`))

}, ms(süre))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sustur',"tempmute"],
  permLevel: 0
};

exports.help = {
  name: 'mute',
  description:"Kullanıcıyı metin kanallarında susturur."
};
