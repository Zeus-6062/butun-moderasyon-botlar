const Discord = require('discord.js')
const db = require('quick.db')
const conf = require("../config.json")
const emojis = require("../emojis.json")

exports.execute = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('0x2f3136').setDescription(`
${emojis.çarpı} Bu Komutu Kullanabilmek İçin Yönetici İznine Sahip Olmalısın.
`))

var log = db.fetch(`log_${message.guild.id}`)
var logcuk = message.guild.channels.cache.get(log)
if(!logcuk) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('0x2f3136')
    .setDescription(`${emojis.çarpı} ${message.author}, Chat log kanalı ayarlanmamış, ilk önce kanalı ayarlaman gerekiyor ${emojis.ünlem}
    Kullanım: \`${conf.Prefix}chat-log #KANAL\``)
)

var rol = db.fetch(`muted_${message.guild.id}`)
var rolcük = message.guild.roles.cache.get(rol)
if(!rolcük) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor('0x2f3136')
    .setDescription(`${emojis.çarpı} ${message.author}, Susturulmuş (Muted) rolü ayarlanmamış, ilk önce rolü ayarlaman gerekiyor ${emojis.ünlem}
    Kullanım: \`${conf.Prefix}susturulmuş-rol @ROL\``)
)  

if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('0x2f3136').setDescription(`
${emojis.çarpı} ${message.author}, Yanlış kullanım ${emojis.ünlem}
**Doğru kullanımlar;**
Etiket engelini açmak istiyorsan; \`${conf.Prefix}etiketengel aç\`
Etiket engelini kapatmak istiyorsan; \`${conf.Prefix}etiketengel kapat\`
`))

let küfür = await db.fetch(`etiketengel_${message.guild.id}`)
if(args[0] === 'aç') {
    if(küfür) {
db.set(`etiketengel_${message.guild.id}`, `acik`)
const aç = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`${emojis.tik} Etiket engel sistemi zaten açık! Kapatmak istiyorsan \`${conf.Prefix}etiketengel kapat\` komutunu kullan ${emojis.ünlem}`)
message.channel.send(aç)
message.react(emojis.tikID)
} else {
    db.set(`etiketengel_${message.guild.id}`, `acik`)
    const aç = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`${emojis.tik} Etiket engel sistemi başarıyla açıldı! Kapatmak istersen \`${conf.Prefix}etiketengel kapat\` komutunu kullan ${emojis.ünlem}`)
    message.channel.send(aç)
    message.react(emojis.tikID)
}
} else if(args[0] === 'kapat') {
db.delete(`etiketengel_${message.guild.id}`)
const kapa = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`${emojis.tik} Etiket engel sistemi başarıyla kapatıldı! Açmak istersen \`${conf.Prefix}etiketengel aç\` komutunu kullan ${emojis.ünlem}`)
message.channel.send(kapa)
message.react(emojis.tikID)
}
};

exports.conf = {
    command: "etiketengel",
    description: "Yardım bölümüdür. Bot hakkında bilgi verir ve komutları gösterir.",
    aliases: []
  }