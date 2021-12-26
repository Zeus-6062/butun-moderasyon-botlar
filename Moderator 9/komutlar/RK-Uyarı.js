const Discord = require('discord.js')
const data = require('quick.db')
const config = require('../config.js')

exports.run = async (client, message, args) => {
let prefix = '.'
let başarısız = new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('RED').setFooter(`İşlem Başarısız`).setTimestamp()
let Başarılı = new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true })).setColor('2f3136').setTimestamp().setThumbnail(message.author.avatarURL({ dynamic: true }))


if(!message.member.roles.cache.has(config.yetkilirol) && !message.member.roles.cache.has(config.kayıtcırol) && !message.member.hasPermission("ADMINISTRATOR")) return;

if(!args[0]) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Komut Kullanılma Sistemini Yanlış Anlamış Gibisin.\n Komut Nasıl Kullanılır? \n\n\`${prefix}uyarı ekle (etiket) (sebep)\`\n\`${prefix}uyarı sil (etiket) (sayı)\`\n\`${prefix}uyarı bilgi (etiket)\``)).then(msg => msg.delete({timeout:5000}));
    return;
}

data.add('case', 1)
const uyarıpuan = data.fetch('case')

if(args[0] === 'ekle') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Bir kişiyi etiketlemelisin.`)).then(msg => msg.delete({timeout:5000}));
    return;
};
if(!kullanıcı) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`)).then(msg => msg.delete({timeout:5000}));
 return;
};
if(kullanıcı.bot) return;
if(kullanıcı.id === message.author.id) return;
let reason = args.slice(2).join(' ')

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, +1)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)

if(!reason) { message.react(config.onayemoji)
await message.channel.send(Başarılı.setDescription(`${kullanıcı}, uyarıldı! Uyarılma Nedeni Yok. Toplam uyarı sayısı: \`${syı}\``))
await client.channels.cache.get(config.uyarılog).send(Başarılı.setDescription(`${kullanıcı} - (\`${kullanıcı.id}\`) **Kullanıcısı Uyarıldı**!\n **Uyaran Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n **Uyarılma Sebebi**: \`Belirtilmemiş\`\n **Ceza Bilet Kodu**: \`${uyarıpuan}\``))
await kullanıcı.send(`${kullanıcı}, merhaba! ${message.guild.name} sunucusunda sebepsiz bir şekilde uyarıldın. Dikkatli ol!`) 
return}

if(reason) { message.react(config.onayemoji)
await message.channel.send(Başarılı.setDescription(`${kullanıcı}, uyarıldı! Uyarılma nedeni: \`${reason}\`. Toplam uyarı sayısı: \`${syı}\``))
await client.channels.cache.get(config.uyarılog).send(Başarılı.setDescription(`${kullanıcı} - (\`${kullanıcı.id}\`) **Kullanıcısı Uyarıldı**!\n **Uyaran Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n **Uyarılma Sebebi**: \`${reason}\`\n **Ceza Bilet Kodu**: \`${uyarıpuan}\``))
await kullanıcı.send(`${kullanıcı}, merhaba! \`${message.guild.name}\` sunucusunda \`${reason}\` sebebiyle uyarıldın. Dikkatli ol!`) 
return} }

if(args[0] === 'sil') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Bir kişi etiketlemelisin.`)).then(msg => msg.delete({timeout:5000}));
    return;
};

if(!kullanıcı) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`)).then(msg => msg.delete({timeout:5000}));
 return;
};
if(kullanıcı.id === message.author.id) return;

let sayı = args[2]
if(!sayı) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Silinecek uyarı sayısını yazmadın!`)).then(msg => msg.delete({timeout:5000}));
    return;
};
if(isNaN(sayı)) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Silinecek uyarı sayısını yazmadın!`)).then(msg => msg.delete({timeout:5000}));
    return;
};
if(sayı === '0') {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Yapmaya çalıştığın şeyi anlayamadım.`)).then(msg => msg.delete({timeout:5000}));
    return;
};
const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(syı2 < sayı) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`${kullanıcı}, kullanıcısının uyarı sayısı: \`${syı2}\`! Sadece bu kadar silebilirsin.`)).then(msg => msg.delete({timeout:5000}));
    return;
};

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, -sayı)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
await message.channel.send(Başarılı.setDescription(`${kullanıcı}, uyarısı silindi! Toplam uyarı sayısı: ${syı ? syı : '0'}`))
await client.channels.cache.get(kanallar.uyarılog).send(Başarılı.setDescription(`${kullanıcı} - (\`${kullanıcı.id}\`) **Kullanıcısının Uyarısı Silindi**!\n **Silen Yetkili**: <@${message.author.id}> - (\`${message.author.id}\`)\n **Ceza Bilet Kodu**: \`${uyarıpuan}\``))
await kullanıcı.send(`${kullanıcı}, merhaba! \`${message.guild.name}\` sunucusunda uyarın silindi. Daha dikkatli ol!`) }

if(args[0] === 'bilgi') {
let kullanıcı = message.mentions.users.first()
if(!args[1]) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`Bir kişi etiketlemelisin.`)).then(msg => msg.delete({timeout:5000}));
    return;
};
if(!kullanıcı) {
    message.react(config.redemoji);
    message.channel.send(başarısız.setDescription(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`)).then(msg => msg.delete({timeout:5000}));
    return;
};

const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(!syı2) return message.channel.send(Başarılı.setDescription(`${kullanıcı}, kullanıcısının hiç uyarısı yok.`))
await message.channel.send(Başarılı.setDescription(`${kullanıcı}: Toplam uyarı sayısı: \`${syı2 ? syı2 : '0'}\``)) }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["uyarı"],
    name: "uyarı"
  }
  
  exports.help = {
    name: "uyarı"
  };