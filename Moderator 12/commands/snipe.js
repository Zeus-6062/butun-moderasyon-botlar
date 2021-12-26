const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name: "snipe",
    run: async(client, message, args) => {

    let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('2F3136')
    let embed = new MessageEmbed().setColor('#2F3136')

  if (message.member.roles.cache.has('814601804167118863') || message.member.roles.highest.position >= message.guild.roles.cache.get("814601804167118863").position) {
  let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
  if (!mesaj) {
    message.delete({timeout: 5000})
    return message.channel.send(hembed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta!`)).then(message.react(client.config.no)).then(msg => msg.delete({timeout: 5000}))}

  let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
  if (mesaj.icerik) {
return message.channel.send(embed.setDescription(`
Mesaj Sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} (\`${mesajYazari.id}\`)
Mesajın Yazılma Tarihi: \`${moment.duration(Date.now() - mesaj.yazilmaTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce
Mesajın Silinme Tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 

Mesaj İçeriği: \`${mesaj.icerik}\`
`)).then(message.react(client.config.tik));
  }
  } else {
    message.delete({timeout: 5000})
    return message.channel.send(hembed.setDescription(`Komutu kullanan kullanıcıda yetki bulunmamakta!`)).then(message.react(client.config.no)).then(msg => msg.delete({timeout: 5000}))
  }


}};


