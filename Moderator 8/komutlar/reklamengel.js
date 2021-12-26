const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const cfg = require("../config.js")
var prefix = ayarlar.prefix 
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  if(args[0] === 'aç') {
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komut Zaten Önceden **açılmış** ⛔\n Kapatmak İçin: **${prefix}reklam-engelle kapat** ☑️`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.red));
    db.set(`reklam_${message.guild.id}`, "acik")
    message.channel.send(new MessageEmbed().setDescription(`${message.author} Reklam Engel Başarıyla **açtın** ☑️`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.tik));
    return
    }
  if (args[0] === 'kapat') {
    if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komut Zaten Önceden **kapatılmış** ⛔\n Açmak İçin: **${prefix}reklam-engelle aç** ☑️`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.red));
    db.delete(`reklam_${message.guild.id}`)
    message.channel.send(new MessageEmbed().setDescription(`${message.author} Reklam Engel Başarıyla **kapattın** ☑️`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.tik));
    return
    }
    message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu Çalıştırmak İçin **aç** veya **kapat** Demen Gerekiyor ⚠️`).setColor('0x800d0d').setAuthor(message.member.displayName,message.author.displayAvatarURL({ dynamic: true})).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.red));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam"],
  permLevel: 0
};
 
exports.help = {
  name: 'reklam-engel',
  description: 'komut',
  usage: 'reklam-engel'
};
