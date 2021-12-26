const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../config.js")
const ms = require("ms")
module.exports.run = async(client,message,args) => {
const guild = message.member.guild
let executor = message.member

//Id girilicek yerler
let mlog = await message.guild.channels.cache.get(osettings.mutelog) || message.guild.channels.cache.get(osettings.cezalog) //mutelogıd
let cezarolu = osettings.mutehammer || "818488108705775617"
let mrol = osettings.muterolu || "822919486486085672"
let cezarolismi = message.guild.roles.cache.get(cezarolu)

//Hehe burdan sonrası Ozzynin Büyüsü
moment.locale("tr")
let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Relly", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()

//ifler gelsin ifler

//Rol kontrol
if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(cezarolu)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${cezarolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let cezalandirilicak = message.mentions.members.first() || message.guild.members.cache.get(args[0])
//Etiket kontrol
if(!cezalandirilicak) {
    return message.channel.send(oziemb.setDescription(`**Lütfen geçerli birini etiketleyiniz veya geçerli bir ID giriniz.**\nÖrnek Kullanım:\`.mute Relly/ID [Süre] [Sebep]\`.`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
//Rol kontrol vol 2   
if(executor.roles.highest.position <= cezalandirilicak.roles.highest.position) {
    return message.channel.send(oziemb.setDescription(`**Kendinden üst yetkide birini susturamazsın!**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let zaman = args[1] 
let sahtezaman = zaman;

let sebep = args.splice(2).join(" ") || false; 

if(!zaman || !sebep) {
    return message.channel.send(oziemb.setDescription(`**Lütfen doğru biçimde zaman ve sebep belirtin.**\nÖrnek Kullanım: \`.mute @Relly/ID 1sn/1dk/1sa/1g [Sebep]\`.`).setColor("RED")).then(x => x.delete({timeout:6500}));
}

zaman = zaman.replace("sn","s").replace("dk","m").replace("sa","h").replace("g","d");
zaman = zaman.replace("saniye","s").replace("dakika","m").replace("saat","h").replace("gün","d");
if(!ms(zaman)) {
    return message.channel.send(oziemb.setDescription(`**Lütfen doğru biçimde zaman ve sebep belirtin.**\nÖrnek Kullanım: \`.mute @Relly/ID 1sn/1dk/1sa/1g [Sebep]\``).setColor("RED")).then(x => x.delete({timeout:6500}));
}

let cezatarih = moment(message.createdAt).format("lll")
cezalandirilicak.roles.add(mrol).catch(err => console.log(err))
x = ms(zaman) + message.createdAt
setTimeout(() => {
    cezalandirilicak.roles.remove(mrol).catch(err => console.log(err))
    let y = db.fetch(`Unmute_${cezano}_${guild.name}`)
    if(!y){
    db.set(`Ceza_${cezano}_${guild.name}.bitistarihi`, moment(x).format("lll")) 
    }   //evalle deneme yapıcam
}, ms(zaman))

let cezano = db.fetch(`CezaNo_${guild.name}`) + 1;
db.add(`CezaNo_${guild.name}`, 1)
mlog.send(oziemb.setColor("RED").setDescription(`**${cezalandirilicak} chatte susturuldu!\n\n● Susturan Yetkili: ${executor}\n● Süre: ${sahtezaman}\n● Sebep: ${sebep}\n● CezaNo: \`${cezano}\`**`))
message.channel.send(oziemb.setColor("#FF00FF").setDescription(`**${cezalandirilicak}, ${executor} tarafından ${sebep} sebebiyle ${sahtezaman} boyunca susturuldu!**`))


let ceza = {
    no: cezano,
    tur: "Mute", 
    sebep: sebep,
    baslamatarihi: cezatarih,
    bitistarihi:  "Hala Susturulu",
    cezalandiran: executor.id,
    cezalanan: cezalandirilicak.id
}
db.set(`Ceza_${cezano}_${guild.name}`, ceza)
db.add(`Mute_${cezalandirilicak.id}`,1)

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur","chatmute","tempmute"],
  permLevel: 0
};

exports.help = {
  name: 'mute',
};