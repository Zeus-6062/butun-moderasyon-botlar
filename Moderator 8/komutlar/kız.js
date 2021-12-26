const { MessageEmbed } = require("discord.js");
const cfg = require("../config.js");
const db = require('quick.db')
var moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

module.exports.run = async (client ,message,args ) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if(!message.member.roles.cache.has(cfg.yetki.register) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  const member = await db.fetch(`vegaskayıt.${message.author.id}.${message.guild.id}.member`)
  let yecep = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(member);
  try {
  if(yecep.user.bot) return message.channel.send(vegasembed.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red)).catch(err => message.channel.send(vegasembed.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red)))
  if(yecep.id == (`${message.author.id}`)) return message.channel.send(vegasembed.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))

  let b_uses = db.get(`üyeban.${yecep.id}`) || 0;
  let kc_uses = db.get(`üyekick.${yecep.id}`) || 0;
  let j_uses = db.get(`üyejail.${yecep.id}`) || 0;
  let m_uses = db.get(`üyechatmute.${yecep.id}`) || 0;
  let s_uses = db.get(`üyesesmute.${yecep.id}`) || 0;
  let total = b_uses + j_uses + m_uses + s_uses + kc_uses
  
  let bb_uses = db.get(`cezapuanıban.${yecep.id}`) || 0;
  let kk_uses = db.get(`cezapuanıkick.${yecep.id}`) || 0;
  let jj_uses = db.get(`cezapuanıjail.${yecep.id}`) || 0;
  let mm_uses = db.get(`cezapuanıchatmute.${yecep.id}`) || 0;
  let ss_uses = db.get(`cezapuanısesmute.${yecep.id}`) || 0;
  let totall = bb_uses + jj_uses + mm_uses + ss_uses + kk_uses
  
  if(totall > `40`) {
  return message.channel.send(vegasembed.setDescription(`🚫 Bu üyenin ceza puanı **${totall}** Bu sebepten ötürü kayıt işlemi iptal edildi.Sunucumuzda tüm işlemlerin kayıt altına alındığını unutmayın.Sorun teşkil eden, sunucunun huzurunu bozan ve kurallara uymayan kullanıcılar sunucumuza kayıt olamazlar.\n\nEğer konu hakkında bir şikayetiniz var ise <@&${cfg.yetki.yöneticirolü}> rolü ve üstlerine ulaşabilirsiniz.`)).then(msg => msg.delete({timeout: 10000}), message.react(cfg.react.red))
  }

  let member2 = yecep.user;
  let zaman = new Date().getTime() - member2.createdAt.getTime();
  const gecen = moment
  .duration(zaman)
  .format(`DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`);
  var user = member2;
  var cfxzaman = [];
  if (zaman < 604800000) {
  return message.channel.send(vegasembed.setDescription(`Bu üyenin hesabı ${gecen} önce açıldığı için kaydı gerçekleştirelemedi.`)).then(msg => msg.delete({timeout: 10000}), message.react(cfg.react.red))
  db.add(`fakekayıt.${message.author.id}`, 1)
  } 
  


  await yecep.roles.remove(cfg.kayıt.unregister)
  await yecep.roles.remove(cfg.kayıt.erkek)
  await yecep.roles.add(cfg.kayıt.kadın) 
  if(yecep.user.username.includes(cfg.tag.taglıTag)) yecep.roles.add(cfg.tag.tagRol) 
  db.add(`kızkayıt.${message.author.id}`, +1)
  db.add(`toplamkayıt.${message.author.id}`, +1)
  db.add('isimlerkız.'+yecep.id, 1)
  db.push("isimler." + yecep.id,  `\`${yecep.displayName}\` (<@&${cfg.kayıt.kadın[0]}>)\n`)
  db.delete(`vegaskayıt.${message.author.id}.${message.guild.id}.member`)

  const vegas = new MessageEmbed()
  .setColor(`RANDOM`)
  .setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true}))
  .setFooter(`Üyenin ceza puanı: ${totall}`)
  .setDescription(`${yecep} adlı kullanıcı başarıyla kız olarak kaydedildi.`)
  message.channel.send(vegas).then(msg => msg.delete({timeout: 5000}));
  await message.react(cfg.react.tik)
  client.channels.cache.get(cfg.channel.chat).send(`Aramıza yeni biri katıldı! ${yecep} ona hoş geldin diyelim!`).then(m => m.delete({timeout: 3000}))
  } catch(err) { 
    //message.channel.send(new MessageEmbed().setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setColor('RANDOM')).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  }

};  
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["k","kadın","karı","gacı","KIZ","K",'Kız','Gacı'],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'kız'
    
  }

