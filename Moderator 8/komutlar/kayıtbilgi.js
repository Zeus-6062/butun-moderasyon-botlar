const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const cfg = require("../config.js");

module.exports.run = async (client, message, args, presence) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.kayıt) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  const member = message.guild.member(user);
  let kız = db.get(`kızkayıt.${member.id}`) || 0;
  let erkek = db.get(`erkekkayıt.${member.id}`) || 0;
  let fakekayıt = db.get(`fakekayıt.${member.id}`) || 0;
  let toplam = kız+erkek+fakekayıt
  
  const vegas = new MessageEmbed()
  .setColor(`RANDOM`)
  .setAuthor(`Kayıt Bilgi`, client.user.avatarURL({dynamic: true}))
  .setTimestamp()
  .setFooter(`Relly Was Here!`)
  .setDescription(`${user} Net Toplam **${toplam}** Kayıt (**${toplam}** Toplam, **${kız}** Kadın, **${erkek}** Erkek, **${fakekayıt}** Fake)`);
  message.channel.send(vegas);
  message.react(cfg.react.tik)
  
};
exports.conf = {
    aliases: ["kayitbilgi","kayıtb","kayıt",'Kayıtbilgi','KAYITBİLGİ','Kayıtb'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kayıtbilgi'
  };