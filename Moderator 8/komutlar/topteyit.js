const Discord = require("discord.js");
const db = require('quick.db')
const config = require("../config.js");

exports.run = async (client, message, args) => {
  if(db.fetch(`bakim`)) {
    if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
  }
 if (
    !message.member.roles.cache.has(config.kayıtcırol) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
  return message.channel.sendEmbed(
      new Discord.MessageEmbed()
        .setDescription(
          `Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!`
        )
        .setColor("#black")
    );
  
let x = message.guild.members.cache.filter(x => db.has(`${message.guild.id}.${x.id}.kayıtSorgu_`))

if(x && x.array().length == 0) {
 return message.channel.send(new Discord.MessageEmbed().setDescription("Sunucuda Henüz hiç bir kayıt yapılmamış.").setColor('black'))
} else {
let obj = []
let kaan = 0
let sorted = x.sort((a,b) => db.get(`${message.guild.id}.${b.id}.kayıtSorgu_`) - db.get(`${message.guild.id}.${a.id}.kayıtSorgu_`)).map((r,index) => `**${++kaan}. ${r.user}** - (\`${r.user.id}\`) **${db.get(`${message.guild.id}.${r.id}.kayıtSorgu_`)}** Kayıt Etmiş!`).slice(0, 10)
let Embed = new Discord.MessageEmbed().
setColor("black")
.setDescription(sorted)
message.channel.send(Embed)
}

  


}

exports.conf = { enabled: true, aliases: ['top-teyit'], permLevel: 0 };

exports.help = { name: 'topteyit', usage: `topteyit` }