const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../config.js")

module.exports.run = async(client,message,args) => {
const guild = message.member.guild
let executor = message.member
//Embed açalım bitane
let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Relly", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
moment.locale("tr")
//Id girilcek yerler
let cezarolu = osettings.banhammer || "818488106415554591"; // Proje hazır proje değilse id girilcek
let cezalog = message.guild.channels.cache.get(osettings.banlog) || message.guild.channels.cache.get(osettings.cezalog)


let cezarolismi = message.guild.roles.cache.get(cezarolu).name;

if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let cezalandirilicak = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!cezalandirilicak) {
    return message.channel.send(oziemb.setDescription(`**Lütfen geçerli birini etiketleyiniz veya geçerli bir ID giriniz.**\nÖrnek Kullanım:\`.ban Relly/ID [Sebep]\`.`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

//Kendinden üst rolü olan biri yasaklanmamalı!

if(executor.roles.highest.position <= cezalandirilicak.roles.highest.position) {
    return message.channel.send(oziemb.setDescription(`**Kendinden üst yetkide birini yasaklayamazsın!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

//Kişi banlanabilir mi onu ölçmek şart
if(!cezalandirilicak.bannable) {
    return message.channel.send(oziemb.setDescription(`**${cezalandirilicak} kişisini yasaklayacak yetkim bulunmuyor.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

//Sebepi zorunlu kılalım
let sebep = args.splice(1).join(" ")
if(!sebep) sebep = "Belirtilmemiş."
// Tarihi Alalım
let cezatarih = moment(message.createdAt).format("lll");
let cezano = db.fetch(`CezaNo_${guild.name}`) + 1;
db.add(`CezaNo_${guild.name}`, 1)
cezalandirilicak.send(oziemb.setDescription(`**${guild.name} sunucusundan \`${sebep}\` nedeniyle yasaklandın!**`).setColor("RED")).catch(err => console.log(err));
cezalandirilicak.ban({reason: sebep}).catch(err => console.log(err));

let ceza = {
    no: cezano,
    tur: "Ban", 
    sebep: sebep,
    baslamatarihi: cezatarih,
    bitistarihi: "Hala Yasaklı",
    cezalandiran: executor.id,
    cezalanan: cezalandirilicak.id
}
db.set(`Ceza_${cezano}_${guild.name}`, ceza)
db.add(`Ban_${cezalandirilicak.id}`,1)
//6 İzleyiciye selam olsun :yum:

message.channel.send(oziemb.setDescription(`**${cezalandirilicak}, ${executor} tarafından \`${sebep}\` nedeniyle sunucumuzdan yasaklandı!**`).setColor("GREEN"))
cezalog.send(oziemb.setDescription(`**${cezalandirilicak}, ${executor} tarafından \`${sebep}\` nedeniyle sunucumuzdan ${cezatarih} tarihinde yasaklandı!\`CezaNo: ${cezano}\`**`).setColor("RED"))

}
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['relly','yak','infaz','yasakla'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ban',
  };