const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const cfg = require("../config.js");
const moment = require("moment")

module.exports.run = async(client, message, args) => {
  
  let embedvegas2 = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.roles.cache.has(cfg.yetki.register) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`<a:xxxxxxxxxxxxxxxxxxxxxxxxxxxxx:820344465050173541> Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.red))
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
  let tagaldıtopsayı = db.get(`tagaldıtoplam.${member.id}`) || 0;
  let tagaldıüyeler = db.get(`kullanici.${member.id}.tagaldıüyeler`) || [];
  let vegas = tagaldıüyeler.length > 0 ? tagaldıüyeler.map((value, index) => `\`${index+1}.\` <@!${value.ID}> │ ${value.ID} | ${value.Saat}`).join("\n") : `${member} kişisi hiçbir üyeye tag aldırmamış!`
  let VegasEmbed1 = new MessageEmbed()
  .setAuthor(`${message.guild.name} Tag Aldırma Sistemi`, message.guild.iconURL({dynamic: true}))
  .setDescription(`${tagaldıtopsayı ? `${member} üyesinin tag aldırdığı üyeler; **(${tagaldıtopsayı})**\n\n**Sunucuda bulunanlar;**\n`: ""} ${vegas}`)
  message.channel.send(VegasEmbed1)    
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['tag-liste','Tag-Liste','Tag-liste','TAG-LİSTE','TAGLİSTE','TagListe','Tagliste','tagaldıliste'],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'tagliste',
  }
