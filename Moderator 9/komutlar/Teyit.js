const dc = require('discord.js')
const db = require('quick.db')
const config = require("../config.js")

exports.run = async (client, message, member) => {
  
if(!message.member.roles.cache.some(r => [(config.kayıtcırol)].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")  

  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}.toplam`);
let başlık = "Top Teyit Listesi"
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` Kayıda Sahip.").join('\n');
message.channel.send(
  new dc.MessageEmbed()

  .setAuthor(başlık, message.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .setFooter("Komut "+message.member.displayName+" Tarafından Kullanıldı.", message.author.avatarURL)
  .setDescription(top)
  );
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["topteyit","top","top-teyit"],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'topteyit',
    
  }