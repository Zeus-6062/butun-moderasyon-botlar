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
let cezarolu = osettings.jailhammer || "818488107245764651"; 
let ujlog = osettings.jaillog || "824709257315352656";
let brol = osettings.boosterrolu || "boosterrolid";
let ujrol = osettings.unregister || "818488103027081217";
ujlog = guild.channels.cache.get(ujlog)
//
let cezarolismi = guild.roles.cache.get(cezarolu).name
let ujrolismi = guild.roles.cache.get(ujrol).name

if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
//Kişi etiketli / idsi girili mi
let kisi = message.mentions.members.first() || guild.members.cache.get(args[0])
if(!kisi) {
    return message.channel.send(oziemb.setDescription(`**Lütfen hapisden çıkarılacak kişiyi etiketleyin veya bir ID giriniz.**\nÖrnek Kullanım:\`.unjail Relly/ID [Sebep]\`.`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let tarih = moment(message.createdAt).format("lll")
kisi.roles.cache.has(brol) ? kisi.roles.set([brol,ujrol]) : kisi.roles.set([ujrol]);
//Hapis açmayla ilgili mesajlarr
message.channel.send(oziemb.setDescription(`**${kisi} kullancısı başarıyla hapisten çıkartıldı ve ${ujrolismi} ismi verildi.**`).setColor("GREEN"));
ujlog.send(oziemb.setDescription(`**${kisi} kullancısının cezası ${executor} tarafından başarıyla kaldırıldı.\nTarih: ${tarih}**`).setColor("GREEN"));
//Bitiş süresini ekleyelimmm
let cezano = db.fetch(`CezaNo_${guild.name}`);
for (i = cezano; i > 0; i--) {
    let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
    if(ceza.cezalanan == sorguid && ceza.tur == "Jail"){
        db.set(`Ceza_${i}_${guild.name}.bitistarihi`, moment(message.createdAt).format("lll"))
        break;
    }
  }
}
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["unkarantina","karantinaçıkar","karantinaaç"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'unjail',
  };
  