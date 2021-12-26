const Discord = require("discord.js");
const db = require("quick.db")
const moment = require('moment');
moment.locale('tr');
const cfg = require('../config.js')
require('moment-duration-format');

module.exports.run = async (client, message, args) => {
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) return message.reply("üye etiketle")
  let sayı = db.fetch(`sj.${message.author.id}`)
  
  if(sayı > 5) {
  
    if(db.fetch(`süre.${message.author.id}`) > Date.now()) {
    return message.channel.send(`\`Sanırım Limitin Doldu Sonraki Limite\` `+moment.duration(db.fetch(`daily.${message.author.id}`)-Date.now()).format(`w [Hafta] d [Gün] h [Saat] m [Dakika] s [Saniye]`)+` \`Kadar Zaman Var\``) 
  } else {
    const eklenecek = Math.floor(Math.random() * 2000) + 100;
    db.set(`süre.${message.author.id}`, Date.now()+require('ms')('1h'));
  }

  }
  
  db.add(`sj.${message.author.id}`,1)
  member.roles.set(cfg.kayıt.unregister)
  const embed = new Discord.MessageEmbed()
  .setDescription(`Bir Kullanıcı Kayıtsıza Düştü`)
  .setFooter(`Günde En Fazla 5 Kişiyi Kayıtsıza Atabilirsin Eğer 5'i Geçerse Banned Oke?`)
  .setColor('#313136')
  message.channel.send(embed)
  
  
    message.guild.channels.cache.get(cfg.Unreglog).send(new Discord.MessageEmbed().setColor('#313136').setDescription(`Kullanıcı Kayıtsıza Atıldı\nAtan: <@${message.author.id}> (\`${message.author.id}\`) \`${message.author.tag}\`\nAtılan: ${member}`))

}
  exports.conf = {
    aliases: ["unregister","kayıtsız","Unregisterr"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kayıtsız'
  };