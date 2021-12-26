const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const cfg = require("../config.js");
const fs = require("fs")
const { Client, MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args, presence) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.yetki.register) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`:x: Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const fs = require("fs")
  await fs.unlink('isimler.txt', function (err) {
  if (err) throw err;
  });
  if (!member) return message.channel.send(vegasembed.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))
  let isimlerkız = db.get(`isimlerkız.${member.id}`) || 0;
  let isimler = db.get(`isimler.${member.id}`) || 0;
  let isimlererkek = db.get(`isimlererkek.${member.id}`) || 0;
  let totalisimler = isimlererkek + isimlerkız

  let isims;
  if(!isimler) isims = "Kullanıcının veri tabanında eski isim kayıtı bulunamadı."
  else isims = isimler.map(x => `${x}`).join(" • ")
  fs.appendFile('isimler.txt', `${totalisimler ? `Bu üyenin toplamda ${totalisimler} isim kayıtı bulundu:`: ""}\n\n • ${isims}`, function (err, data) {
  if (err) throw err;
  });
  
  let Vegasss = new MessageEmbed()
  .setColor(`RANDOM`)
  .setAuthor(member.user.tag, member.user.avatarURL({dynamic: true}))
  .setDescription(`${totalisimler ? `Bu üyenin toplamda ${totalisimler} isim kayıtı bulundu:`: ""}\n\n • ${isims}`)
  message.channel.send(Vegasss).catch(err => {
  const buffer = fs.readFileSync('./isimler.txt');
  const attachment = new MessageAttachment(buffer, 'isimler.txt');
  message.channel.send(`Kişinin isimler dosyası çok kabarık... 2000 kelime sınırını geçtiği için dosya olarak göndermek zorundayım.`, attachment) 
  })

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["İsimler","İSİMLER"],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'isimler'
    
  }