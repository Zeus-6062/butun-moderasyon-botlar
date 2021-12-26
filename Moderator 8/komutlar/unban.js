const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../config.js")

module.exports.run = async(client,message,args) => {
const guild = message.guild;
const executor = message.member;
moment.locale("tr") // Türkiye bura
//Embed
let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Relly", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

//Gerekli IDLER!!!!! (Hazır proje değilse burayı doldurun)
let cezarolu = osettings.banhammer || "818488106415554591"; 
let ublog = osettings.banlog ||  message.guild.channels.cache.get(osettings.cezalog) //banlogıd
ublog = guild.channels.cache.get(ublog)
//
let cezarolismi = guild.roles.cache.get(cezarolu).name
//

if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

if(!args[0]) {
    return message.channel.send(oziemb.setDescription(`**Lütfen affedilecek kişi için geçerli bir ID giriniz.**\nÖrnek Kullanım:\`.unban Relly/ID [Sebep]\`.`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let sorguid = args[0]
let kisi = await client.users.fetch(sorguid)
// Try Catch kullanalım ki yasaklamayı acabilcegim biri var mı buluyım

try {
    guild.members.unban(sorguid)
} catch (err) {
    console.log(err)
    return message.channel.send(oziemb.setDescription(`**Aratılan ID'de ${guild.name} sunucusunda yasaklı birini bulamadım.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let tarih = moment(message.createdAt).format("lll")
message.channel.send(oziemb.setDescription(`**${kisi} kullancısının yasaklaması başarıyla kaldırıldı.**`).setColor("GREEN"));
ublog.send(oziemb.setDescription(`**${kisi} kullancısının yasaklaması ${executor} tarafından başarıyla kaldırıldı.\nTarih: ${tarih}**`).setColor("GREEN"));
let cezano = db.fetch(`CezaNo_${guild.name}`);
for (i = cezano; i > 0; i--) {
    let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
    if(ceza.cezalanan == sorguid && ceza.tur == "Ban"){
        db.set(`Ceza_${i}_${guild.name}.bitistarihi`, moment(message.createdAt).format("lll"))
        break;
    }
  }
}
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["affet","banac","banaç"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unban',
  };