const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../config.js")


module.exports.run = async(client,message,args) => {
    const guild = message.member.guild
    let executor = message.member
    //Embed açalım bitane
    moment.locale("tr")
    let oziemb = new Discord.MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({dynamic: true}))
        .setFooter("Relly", executor.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()


        //Gerekli idler buraya
        let cezarolu = osettings.jailhammer || "818488107245764651" // id girilecek buraya da :) eğer proje benim projem değilse
        let boosterrolu = osettings.boosterrolu || "boosterrolüid" // Proje hazır değilse id gelicek .)
        let jailrolu = osettings.jailrolu || "818488104116682763" // Buraya da aynı şekilde 
        let jlog = message.guild.channels.cache.get(osettings.jaillog) || message.guild.channels.cache.get(osettings.cezalog) // jaillogıd

        let cezarolismi = message.guild.roles.cache.get(cezarolu).name;


        if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
            return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
        }
        let cezalandirilicak = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!cezalandirilicak) {
            return message.channel.send(oziemb.setDescription(`**Lütfen geçerli birini etiketleyiniz veya geçerli bir ID giriniz.**\nÖrnek Kullanım:\`.jail Relly/ID [Sebep]\`.`).setColor("RED")).then(x => x.delete({timeout:6500}));
        }
        
        //Kendinden üst rolü olan biri yasaklanmamalı!
        
        if(executor.roles.highest.position <= cezalandirilicak.roles.highest.position) {
            return message.channel.send(oziemb.setDescription(`**Kendinden üst yetkide birini hapse atamazsın!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
        }

let sebep = args.splice(1).join(" ") 
if(!sebep) {
    return message.channel.send(oziemb.setDescription(`**Lütfen bir sebep belirtin!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let booster = false;

if(cezalandirilicak.roles.cache.has(boosterrolu)) booster = true;

let bot = guild.me;
if(bot.roles.highest.position <= cezalandirilicak.roles.highest.position) {
    return message.channel.send(oziemb.setDescription(`**Botün üstünde birini hapse atamazsın!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let cezano = db.fetch(`CezaNo_${guild.name}`) + 1;
db.add(`CezaNo_${guild.name}`, 1)
const cezatarih = moment(message.createdAt).format("lll")
message.channel.send(oziemb.setDescription(`**${cezalandirilicak}, ${executor} tarafından \`${sebep}\` nedeniyle hapishaneye yollandı!**`).setColor("GREEN"))
jlog.send(oziemb.setDescription(`**${cezalandirilicak}, ${executor} tarafından \`${sebep}\` nedeniyle ${cezatarih} tarihinde hapishaneye yollandı! \`CezaNo: ${cezano}\`**`).setColor("GREEN"))
booster ? cezalandirilicak.roles.set([boosterrolu, jailrolu]) : cezalandirilicak.roles.set([jailrolu])



let ceza = {
    no: cezano,
    tur: "Jail", 
    sebep: sebep,
    baslamatarihi: cezatarih,
    bitistarihi: "Hala Hapiste",
    cezalandiran: executor.id,
    cezalanan: cezalandirilicak.id
}
db.set(`Ceza_${cezano}_${guild.name}`, ceza)
db.add(`Jail_${cezalandirilicak.id}`,1)

}
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["karantina","permjail"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'jail',
  };