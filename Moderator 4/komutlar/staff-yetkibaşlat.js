const db = require('quick.db');
const Discord = require('discord.js');
const conf = require('../ayarlar.json');
exports.run = async(client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(conf.carpi)

let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!üye) return message.reply(`Kullanıcı etiketle.`)

üye.roles.add(conf.yeniYroller)

message.channel.send(`${üye} üyesi için yetki başlatıldı.`).then(qwe => qwe.delete({ timeout: 5000 }))

}
exports.conf = {
    aliases : []
}
exports.help = {
name : 'yetkibaşlat'
}
