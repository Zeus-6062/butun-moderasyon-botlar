const Discord = require("discord.js");
const ms = require('ms')
const data = require('quick.db')
const moment = require('moment')
const ayarlar = require('../config.js')

module.exports.run = async (client, message, args) => {
  moment.locale('tr')

    if (!message.member.roles.cache.has(ayarlar.vmutehammer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(`Lütfen, susturacağım kullanıcıyı belirtin.`)

let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.find(user => user.user.username.toLowerCase().includes(args[0].toLowerCase()))
  if(!mention) {
    message.react(config.MessageReactCross);
    message.channel.send(başarısız.setDescription(`${args[0]}, kullanıcısını bu sunucuda bulamıyorum.`));
    return;
  };

if(user.serverMute === true) return message.channel.send(`Kullanıcı zaten susturulduğu için tekrar susturamam.`)

let time = args[1]
if(!time || !ms(time)) return message.channel.send(`Lütfen, geçerli bir süre belirtin.`)

if(ms(time) > 2592000000) return message.channel.send(`Bir kullanıcıyı en fazla 30 gün susturabilirsiniz.`)

let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş."

let açılma_zamanı = Date.now() + ms(time)

let muteid = await data.fetch('id')


message.channel.send(`
**${user.user}** Adlı Kullanıcı Ses Kanallarından Uzaklaştırıldı. (\`#${muteid-(-1)}\`)
 `)

data.add('id',1)
const mutelog = new Discord.WebhookClient(ayarlar.vmutelogid, ayarlar.vmutelogtoken)

let embed = new Discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(message.author.username , message.author.avatarURL({ dymaic: true}))
.setDescription(`**${user.user}** isimli kullanıcı, ${message.author} tarafından başarıyla **${time}** boyunca ses kanalında susturuldu. (\`#${muteid-(-1)}\`)

\`•\` **Susturulma Zamanı:** ${moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Sebep:** ${reason}

`)
mutelog.send(embed)
user.voice.setMute(true);

setTimeout(() => {
if(user.serverMute === false) return 

user.voice.setMute(false);

let embed2 = new Discord.MessageEmbed()
.setColor(`RANDOM`)
.setAuthor(message.author.username , message.author.avatarURL({ dymaic: true}))
.setDescription(`**${user.user}**Adlı Kullanıcı ses kanallarından cezası Kaldırıldı. (\`#${muteid-(-1)}\`)

\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Atılış Sebepi:** ${reason}
`)
mutelog.send(embed2)
}, ms(time));

data.push(`kullanici.${user.id}.cezabilgi`, {
  Ceza: "Ses Mute",
  Sebep: reason,
  Yetkili: message.author.id
});
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sesmute"],
  permLevel: 0,
  name: "vmute"
}

exports.help = {
  name: "vmute"
};