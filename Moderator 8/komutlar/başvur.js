const Discord = require('discord.js');

exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.MessageEmbed()
.setDescription('Kullanım: .basvuru Yetkili olma sebebinizi belirtiniz! ⚠️'));
const embed = new Discord.MessageEmbed()
.setColor('BLACK')
.setDescription('Başvurunuz Bildirildi! ☑️')
message.channel.send(embed)
const embed2 = new Discord.MessageEmbed()
.setColor("BLACK")
.setFooter('Reborn Başvuru Sistemi', client.user.avatarURL())
.setDescription(`🔊 **${message.author.tag}** Adlı Kullanıcıdan Başvuru İsteği Aldım:`)
.addField(`Kullanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nİlgilenecek Yetkili: <@&818488086005940254> `)
.addField("Başvuru Açıklaması", type)
.setTimestamp()
.setThumbnail(message.author.avatarURL())
client.channels.cache.get('842011505545314334').send(embed2); // Kanal ID 

let logKanal = client.channels.cache.get("842038089496657920")
  if(logKanal) logKanal.send(new Discord.MessageEmbed().setDescription(`\`Başvuru\` komutunu ${message.channel} kanalında ${message.author} kullandı.`))  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["başvuru","başvur"],
  permLevel: 0 
};

exports.help = {
  name: 'basvuru',
  description: 'Başvuru de bulunursunuz.',
  usage: 'basvuru <Basvuru>'
};
