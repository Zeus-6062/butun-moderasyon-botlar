const { MessageEmbed, Message } = require('discord.js');
const db = require('quick.db');
const kdb = new db.table("ceza");
const ayarlar = require('../ayarlar.json');

exports.run = async function(client, message, args) { 

if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.carpi)

let embed = new MessageEmbed() .setColor('RANDOM') .setTimestamp() .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!user) return message.channel.send(embed.setDescription(`Kullanıcı etiketle.`)).then(qwe => qwe.delete({ timeout: 5000 }))
    
let data = await kdb.fetch(`sicil.${user.id}`)
if(!data) return message.channel.send(embed.setDescription(`Kullanıcının sicil geçmişi temiz.`)).then(qwe => qwe.delete({ timeout: 5000 }))

if(data) { 
kdb.delete(`sicil.${user.id}`)
message.channel.send(embed.setDescription(`${user} kullanıcısının sicil geçmişi başarıyla temizlendi!`)).then(qwe => qwe.delete({ timeout: 5000 }))
}

};

exports.conf = {
    aliases:[]
};

exports.help = {
    name:'sicil-temizle'
}