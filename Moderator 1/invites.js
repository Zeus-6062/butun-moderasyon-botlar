const Discord = require("discord.js"); 
const db = require('quick.db')
module.exports.execute = (client, message, args) => {
  let a = message.mentions.users.first() || message.author
let arxemb = new Discord.MessageEmbed().setAuthor(`${a.username}`, a.avatarURL({dynamic: true})).setFooter(`Antiperes was here!`)
  let davetsayi = db.fetch(`davetsayi.${a.id}.${message.guild.id}`)
  let fake = db.fetch(`fake.${a.id}.${message.guild.id}`)
  let toplam = db.fetch(`toplam.${a.id}.${message.guild.id}`)
  let günlük = db.fetch(`günlük.${a.id}.${message.guild.id}`)
  let sayi = günlük ? message.guild.members.cache.filter((m) => günlük.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : "0";
  message.channel.send(arxemb.setDescription(`Toplam **${toplam ? toplam : '0'}** davetin mevcut. (**${davetsayi ? davetsayi : '0'}** gerçek, **${fake ? fake : '0'}** fake, **${sayi ? sayi : '0'}** günlük)`))

};

module.exports.configuration = {
  name: "rank", 
  description: "",
  usage: "",
  aliases: ["invites", "davet"], 

};