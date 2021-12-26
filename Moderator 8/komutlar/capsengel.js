const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const cfg = require("../config.js")
var prefix = ayarlar.prefix 
const Discord = require('discord.js')
exports.run = async (client, message, args) => {
  if(args[0] === 'aç') {
    if(db.has(`capslock_${message.guild.id}`)) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komut Zaten Önceden **açılmış** ⛔\n Kapatmak İçin: **${prefix}capslock-engelle kapat** ☑️`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.red));
    db.set(`capslock_${message.guild.id}`, "acik")
    message.channel.send(new MessageEmbed().setDescription(`${message.author} Reklam Engel Başarıyla **açtın** ☑️`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.tik));
    return
    }
    if (args[0] === 'kapat') {
      if(!db.has(`capslock_${message.guild.id}`)) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komut Zaten Önceden **kapatılmış** ⛔\n Açmak İçin: **${prefix}capslock-engelle aç** ☑️`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.red));
      db.delete(`capslock_${message.guild.id}`)
      message.channel.send(new MessageEmbed().setDescription(`${message.author} Reklam Engel Başarıyla **kapattın** ☑️`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.tik));
      return
      }
      message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu Çalıştırmak İçin **aç** Veya **kapat** Demen Gerekiyor ⚠️`).setColor('0x800d0d').setAuthor(message.member.displayName,message.author.displayAvatarURL({ dynamic: true})).setTimestamp()).then(x => x.delete({timeout: 10000}), message.react(cfg.react.red));
  };  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslock-engelle'],
  permLevel: 3
};
exports.help = {
  name: 'capslock-engelle',
  category: 'Moderasyon komutları!',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelle'
};

