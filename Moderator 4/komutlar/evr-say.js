const Discord = require("discord.js");
const { set } = require("quick.db");
const ayarlar = require('../ayarlar.json');
module.exports.run = async (client, message, args) => {       

let Tag = ayarlar.taG

   var TotalMember = message.guild.memberCount
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Kayıtlı = message.guild.members.cache.filter(kayıt => !kayıt.roles.cache.has(ayarlar.kayıtsız)).size;
          var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          var Cezalı = message.guild.members.cache.filter(y => y.roles.cache.has(ayarlar.jailRol)).size;
          var Muteli = message.guild.members.cache.filter(j => j.roles.cache.has(ayarlar.mutedRol)).size;
          var Yetkili = message.guild.members.cache.filter(b => b.roles.cache.has(ayarlar.kayıtcı)).size;
          const embed = new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setFooter(ayarlar.durum)
              .setTimestamp()
              .setThumbnail(message.author.avatarURL({ dynamic: true}))
              .setDescription(`
**➥** Sunucumuzda toplam \`${TotalMember}\` kullanıcı bulunmaktadır.
**➥** Sunucumuzda toplam \`${Kayıtlı}\` kayıtlı kullanıcı bulunmaktadır.
**➥** Sunucumuzda toplam \`${Online}\` aktif kullanıcı bulunmaktadır.
**➥** Ses kanallarında toplam \`${Voice}\` kullanıcı bulunmaktadır.
**➥** Sunucumuzda toplam \`${Cezalı}\` cezalı, \`${Muteli}\` muteli kullanıcı bulunmaktadır.
**➥** Sunucumuzda toplam \`${Yetkili}\` yetkili kullanıcı bulunmaktadır.
**➥** Sunucumuzda isminde ${Tag} tagını bulunduran toplam \`${Taglı}\` kullanıcı bulunmaktadır.
`)
message.delete()
message.channel.send(embed).sil(5)
}
exports.conf = {
    aliases: []
};
 
exports.help = {
name:'say',
description:"Sunucu istatistiklerini gösterir."
}
