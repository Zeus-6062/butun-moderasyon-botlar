const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cfg = require("../config.js");

module.exports.run = async (client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  if (!message.member.voice.channel) {
  return message.channel.send(new MessageEmbed().setDescription(`İlk önce ses kanallarından birine girmelisin. Girdikten sonra tekrar denersen olacaktır.`).setFooter(client.user.username,client.user.avatarURL({dynamic:true})).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))  } 
  let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  if (!kullanıcı) return message.channel.send(vegasembed.setDescription(`Lütfen bir üyeyi etiketle ve tekrar dene!`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))
  if (kullanıcı.user.bot) return message.channel.send(vegasembed.setDescription(`Botlara herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))
  if(kullanıcı.id == (`${message.author.id}`)) return message.channel.send(vegasembed.setDescription(`Kendine herhangi bir işlem uygulayamazsın.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))
  if (!kullanıcı.voice.channel) return message.channel.send(vegasembed.setDescription(`Belirttiğin Kişi herhangi bir ses kanalında değil.`)).then(msg => msg.delete({timeout: 5000}), message.react(cfg.react.tik))
  if (message.member.hasPermission('ADMINISTRATOR')) return message.member.voice.setChannel(kullanıcı.voice.setChannel(message.member.voice.channelID)).catch(err => {}) && message.channel.send(new MessageEmbed().setDescription(`Başarıyla <@${kullanıcı.id}> adlı üye kanalınıza taşındı.`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(msg => msg.delete({timeout: 5000})) && message.react(cfg.react.tik)
  const filter = (reaction, user) => {
  return [cfg.react.tik, cfg.react.red].includes(reaction.emoji.id) && user.id === kullanıcı.id;
  };
  message.channel.send(`<@${kullanıcı.id}>`).then(msg => msg.delete({timeout: 5000}))
  message.channel.send(new MessageEmbed().setFooter('Eğer istek onaylanmazsa 20 saniye sonra iptal edilecek.').setDescription(`<@${message.author.id}> bulunduğu ses kanalına çekmek istiyor. Kabul ediyor musun?`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setColor(`RANDOM`))
  .then(m => m.react(cfg.react.tik)
  .then(a => m.react(cfg.react.red))
  .then(s =>
  m
  .awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] })
  .then(collected => {
  const reaction = collected.first()
  if (reaction.emoji.id === cfg.react.tik) {
  message.react(cfg.react.tik)
  message.channel.send(new MessageEmbed().setDescription(`<@${message.author.id}>, Belirttiğin kişiyi bulunduğun ses kanalına taşıdın. `).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(m => m.delete({timeout: 5000}));
  kullanıcı.voice.setChannel(kullanıcı.voice.setChannel(message.member.voice.channelID)).catch(err => {})
  m.delete()
  }
  if (reaction.emoji.id === cfg.react.red) {
  message.react(cfg.react.red)
  message.channel.send(new MessageEmbed().setDescription(`<@${message.author.id}>, Belirttiğin kişi bulunduğun ses kanalına gelmek istemiyor bu sebepten ötürü bulunduğun ses kanalına taşıyamadım. `).setAuthor(message.member.displayName, message.member.user.avatarURL({dynamic: true})).setColor(`RANDOM`)).then(m => m.delete({timeout: 5000}));
  m.delete();
  }
  }).catch(err => m.edit(new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll() && message.react(cfg.react.red))
  ));
  let logKanal = client.channels.cache.get("842038089496657920")
  if(logKanal) logKanal.send(new Discord.MessageEmbed().setDescription(`**Çek** komutunu ${message.channel} kanalında ${message.author} kullandı.`))
  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["gel"],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'çek'
    
  }