const Discord = require("discord.js")
const ayarlar = require("../config.js")
const moment = require('moment')
const ms = require('ms')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(ayarlar.mutehammer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

let role = message.guild.roles.cache.get(ayarlar.muterol) 

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(`Lütfen, susturacağım kullanıcıyı belirtin.`)

if(user.roles.cache.has(role)) return message.channel.send(`Kullanıcı zaten susturulduğu için tekrar susturamam.`)

let time = args[1]
if(!time || !ms(time)) return message.channel.send(`Lütfen, geçerli bir süre belirtin.`)

if(ms(time) > 2592000000) return message.channel.send(`Bir kullanıcıyı en fazla 30 gün susturabilirsiniz.`)

let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş."

let açılma_zamanı = Date.now() + ms(time)

let muteid = await db.fetch('id')
message.channel.send(`
**${user.user}** Adlı Kullanıcı Metin Kanallarından Uzaklaştırıldı. (\`#${muteid-(-1)}\`)
 `)
 db.add('id',1)
 let log = message.guild.channels.cache.find(c=> c.id === ayarlar.mutelog)
user.roles.add(role);

db.set(`${message.guild.id}.${user.id}.mute`, reason)


const muteacılıs = new Discord.WebhookClient(ayarlar.mutelogid, ayarlar.mutelogtoken)

let embed1 = new Discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.author.tag , message.author.avatarURL({dyamic: true}))
.setDescription(`**${user.user}** isimli kullanıcı, ${message.author} tarafından başarıyla **${time}** boyunca metin kanalında susturuldu. (\`#${muteid-(-1)}\`)

\`•\` **Susturulma Zamanı:** ${moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Sebep:** ${reason}

`)
muteacılıs.send(embed1)
setTimeout(() => {
if(!user.roles.cache.has(role.id)) return
user.roles.remove(role.id);
  
db.delete(`${message.guild.id}.${user.id}.mute`)
const mutelogs = new Discord.WebhookClient(ayarlar.mutelogid, ayarlar.mutelogtoken)

let embed = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
.setDescription(`**${user.user}**Adlı Kullanıcı ses kanallarından cezası Kaldırıldı. (\`#${muteid-(-1)}\`)

\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Atılış Sebepi:** ${reason}

`)
mutelogs.send(embed)
}, ms(time));
  
  db.push(`kullanici.${user.id}.cezabilgi`, {
  Ceza: "Mute",
  Sebep: reason,
  Yetkili: message.author.id
});

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 0,
  name: "mute"
}

exports.help = {
  name: "mute"
};
