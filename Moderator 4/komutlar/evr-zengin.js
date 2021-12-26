const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, ayar, emoji) => {
    let boosterrol = ayarlar.boosterRol;
    let tag = ayarlar.taG;

    if(!message.member.roles.cache.has(ayarlar.boosterrol)) return message.react(ayarlar.carpi)

  let boosternick = args.slice(0).join(' ')
  if(!boosternick) return message.reply("Yeni adını girmelisin.").then( a=> a.react(iptal))
  message.member.setNickname(`${tag} ${boosternick}`)
    const emb = new Discord.MessageEmbed()
    .setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setColor("RANDOM")
    .setDescription(`**${ayarlar.beyazyldz} Takma adın başarıyla \`${boosternick}\` olarak değiştirildi!**`)
    message.channel.send(emb)
    message.react(onay);
}

exports.conf = {
    aliases: ["booster", "boosternick", "rich"]
};

exports.help = { 
    name: 'zengin'
};