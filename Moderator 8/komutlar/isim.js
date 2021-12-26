const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const cfg = require("../config.js");

module.exports.run = async (client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.yetki.register) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`:x: Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(vegasembed.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if (member.user.bot)  return message.channel.send(vegasembed.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if(member.id == (`${message.author.id}`)) return message.channel.send(vegasembed.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if (!args[1]) return message.channel.send(vegasembed.setDescription(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: .isim @Relly/ID [İsim] [Yaş]`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  let isim = args[1].charAt(0).replace('i', "İ").toUpperCase() + args[1].slice(1);
  let yaş = args[2];
  if(!yaş || isNaN(yaş)) return message.channel.send(vegasembed.setDescription(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: .isim @Relly/ID [İsim] [Yaş]`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if(yaş >= 36) return message.channel.send(vegasembed.setDescription(`İsmini değiştirdiğin kullanıcının yaşı 36'dan büyük olamaz!`))
  
  let member2 = member.user;
  let zaman = new Date().getTime() - member2.createdAt.getTime();
  const gecen = moment
  .duration(zaman)
  .format(`DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`);
  var user = member2;
  var cfxzaman = [];
  
  if (zaman < 604800000) {
  return message.channel.send(vegasembed.setDescription(`Bu üyenin hesabı ${gecen} önce açıldığı için isim değiştirme gerçekleştirilemedi.`)).then(msg => msg.delete({timeout: 10000}), message.react(cfg.react.red))
  db.add(`fakekayıt.${message.author.id}`, +1)
  } 
  
  let b_uses = db.get(`üyeban.${member.id}`) || 0;
  let kc_uses = db.get(`üyekick.${member.id}`) || 0;
  let j_uses = db.get(`üyejail.${member.id}`) || 0;
  let m_uses = db.get(`üyechatmute.${member.id}`) || 0;
  let s_uses = db.get(`üyesesmute.${member.id}`) || 0;
  let total = b_uses + j_uses + m_uses + s_uses + kc_uses
  
  let bb_uses = db.get(`cezapuanıban.${member.id}`) || 0;
  let kk_uses = db.get(`cezapuanıkick.${member.id}`) || 0;
  let jj_uses = db.get(`cezapuanıjail.${member.id}`) || 0;
  let mm_uses = db.get(`cezapuanıchatmute.${member.id}`) || 0;
  let ss_uses = db.get(`cezapuanısesmute.${member.id}`) || 0;
  let totall = bb_uses + jj_uses + mm_uses + ss_uses + kk_uses
  
  
  if(totall > `40`) {
  return message.channel.send(vegasembed.setDescription(`Bu üyenin ceza puanı **${totall}** Bu sebepten ötürü üyenin isim değiştirme gerçekleştirilemedi.\n\nBelirtilen üye toplamda **${total}** ceza yemiş. **${j_uses}** Jail, **${m_uses}** Mute, **${s_uses}** Sesmute, **${b_uses}** Ban, **${kc_uses}** Kick`).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 10000}), message.react(cfg.react.red))
  }

  let isimlerkız = db.get(`isimlerkız.${member.id}`) || 0;
  let isimler = db.get(`isimler.${member.id}`) || 0;
  let isimlererkek = db.get(`isimlererkek.${member.id}`) || 0;
  let totalisimler = isimlererkek + isimlerkız

  let isims;
  if(!isimler) isims = ":x: Kullanıcının veri tabanında eski isim kayıtı bulunamadı.\n"
  else isims = isimler.map(x => `${x}`).join(" • ")
  let updatedName
  if(member.user.username.includes(cfg.tag.taglıTag)) updatedName = `${cfg.tag.taglıTag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` | ${yaş}` : ``}` 
  else updatedName = `${cfg.tag.tagsızTag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` | ${yaş}` : ``}` 
  
  await member.setNickname(`${updatedName}`).catch(e => { });
  if(member.user.username.includes(cfg.tag.taglıTag)) member.roles.add(cfg.tag.tagsızTag)
  let Vegas = member.id
  let Yetkili = message.author.id
  db.set(`vegaskayıt.${message.author.id}.${message.guild.id}.member`, Vegas)
  db.set(`vegasyetkili.${message.guild.id}.yetkili`, Yetkili)
  
  const vegas = new MessageEmbed()
  .setColor(`RANDOM`)
  .setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true}))
  .setDescription(`${totalisimler ? `${member} kişisinin ismi başarıyla \`"${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` | ${yaş}` : ``}"\` olarak değiştirildi, bu üye daha önce bu isimler ile kayıt olmuş.\n\n☑️ Kişinin toplamda **${totalisimler}** isim kayıtı bulundu.\n• ${isims}\n Kişinin önceki isimlerine \`.isimler @Relly/ID\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`: `${member} üyesinin ismi başarıyla \`${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}${yaş ? ` | ${yaş}` : ``}\` olarak değiştirildi`}`)
  message.channel.send(vegas).then(msg => msg.delete({timeout: 10000}))
  message.react(cfg.react.tik)
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["nick", "İsim","i",'İSİM','Nick'],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'isim'
    
  }