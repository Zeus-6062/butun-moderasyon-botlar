const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
const config = require('../config.js');
require('moment-duration-format');

exports.run = async(client, message, args) => {

    let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RED')
    let embed = new MessageEmbed().setColor('#2F3136')
    message.react(config.onayemoji)

  if (message.member.roles.cache.has('831509652768161832') || message.member.roles.highest.position >= message.guild.roles.cache.get('826104961149698079').position) {
  let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
  if (!mesaj) {
    message.delete({timeout: 5000})
    return message.channel.send(hembed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta.`)).then(msg => msg.delete({timeout: 5000}))}
    
  let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
  if (mesaj.icerik) {
return message.channel.send(embed.setDescription(`

Mesaj İçeriği: \`${mesaj.icerik}\`

${config.okemoji} Mesaj Sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} ( \`${mesajYazari.id}\` )
${config.okemoji} Mesajın Yazılma Tarihi: \`${moment.duration(Date.now() - mesaj.yazilmaTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce
${config.okemoji} Mesajın Silinme Tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 


`))
  }
  } else {
    message.delete({timeout: 5000})
    return message.channel.send(hembed.setDescription(`Bu komutu kullanmak için yetkin yetersiz.`)).then(msg => msg.delete({timeout: 5000}))
  }
};

exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'snipe', 
  description: 'Kanalda silinmiş son mesajı gösterir.',
  usage: 'snipe',
};
