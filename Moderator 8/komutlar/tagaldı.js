const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const cfg = require("../config.js");
const moment = require("moment")

module.exports.run = async(client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.yetki.register) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`✖️ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(new MessageEmbed().setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setColor('RANDOM')).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if (member.user.bot)  return message.channel.send(vegasembed.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if (member.id == (`${message.author.id}`)) return message.channel.send(vegasembed.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  if (await db.fetch(`zatentagaldırılmış.${member.id}.${message.guild.id}`)) return message.reply(`Belirtilen üyeye daha önceden bir başkası tarafından tag aldırılmış!`)
  const filter = (reaction, user) => {
  return ["✅", "❌"].includes(reaction.emoji.name) && user.id === member.id;
  };
  let VegasEmbed1 = new MessageEmbed()
  .setAuthor(`${message.guild.name} Tag Aldırma Sistemi`, message.guild.iconURL({dynamic: true}))
  .setDescription(`**DİKKATLİ OKUMALISIN!**\n Merhaba ${member}, **${message.guild.name}** adlı sunucudan bir üye, size sunucu tagını aldırdığını iddia ediyor.\n\n**Üye:** ${message.author} | ${message.author.tag} | ${message.author.id}\n\nEğer yukarıda belirtilen üye, **size sunucu tagını aldırdıysa** lütfen işlemi mesajdaki **tike basarak onaylayın!** (Aldırmadıysa çarpıya basın!)`)
  .setFooter('Eğer tepkiye tıklanmazsa 1 dakika sonra işlem iptal edilecek. • Developed by Relly')
  message.channel.send(`${member}`).then(msg =>
  message.channel.send(VegasEmbed1)    
  .then(m => m.react("✅")
  .then(a => m.react("❌"))
  .then(s =>
  m
  .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
  .then(collected => {
  const reaction = collected.first();
  if (reaction.emoji.name === "✅") {
  let Vegass = 'Zaten tag aldırılmış'
  let atilanay = moment(Date.now()).format("MM"); //10800000
  let atilansaat = moment(Date.now()).format("HH:mm")//10800000
  let atilangün = moment(Date.now()).format("DD");//10800000
  let atilanyıl = moment(Date.now()).format("YYYY");
  let vegas = `${atilangün} ${atilanay.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanyıl} ${atilansaat}`;
  db.add(`tagaldıtoplam.${message.author.id}`, +1)
  db.push(`kullanici.${message.author.id}.tagaldıüyeler`, {
  ID: member.id,
  Saat: vegas
  })  
  db.set(`zatentagaldırılmış.${member.id}.${message.guild.id}`, Vegass)
  m.edit(new MessageEmbed().setDescription(`Belirttiğiniz üye tag aldırdığınızı onayladı ve üye başarıyla veri tabanına kaydedildi!`).setColor(client.randomColor())) && message.react(cfg.react.tik) && m.reactions.removeAll()
  }
  if (reaction.emoji.name === "❌") {
  message.delete()
  m.delete()
  msg.delete()
  }
  }).catch(err => m.edit(new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll() && message.react(cfg.react.red)) && msg.delete()))) 

  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['tag-aldı','Tagaldı','Tag-aldı','Tag-Aldı','TAGALDI','TAG-ALDI'],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'tagaldı',
  }
