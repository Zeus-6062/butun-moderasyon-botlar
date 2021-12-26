const Discord = require('discord.js')
const ms = require("ms");
const db = require("quick.db");
const conf = require('../ayarlar.json');
const moment = require('moment');
require('moment-duration-format')
exports.run = async (client, message, args) => {

const kdb = new db.table("ceza")

if(!message.member.roles.cache.has(conf.jailH)) return message.react(conf.carpi)
let kullanıcı = message.mentions.users.first()
let cezaID = db.get(`cezaid.${message.guild.id}`) || +1
if(!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Bir kullanıcı etiketlemelisin.`))
if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed() .setDescription(`**${args[0]}**, kişisini sunucuda bulamıyorum.`))
  
if(!args[1]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Cezanın ne kadar kalacağını belirtmelisin.`))
let süre = args[1];

if(!args[2]) return message.channel.send(new Discord.MessageEmbed() .setDescription(`Cezalandırmak için bir sebep girmelisin.`))
let sebep = args[2]

message.guild.members.cache.get(kullanıcı.id).roles.cache.forEach(y => db.push(`rolleri.${kullanıcı.id}`, y.id))

message.guild.members.cache.get(kullanıcı.id).roles.set([conf.jailRol])
db.add(`cezaid.${message.guild.id}`, +1)

let baslangic = Date.now()
let bitis = Date.now() + ms(süre)

let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let jailAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;


    db.add(`jailAtma.${message.author.id}`, 1)
    db.add(`jailAlma.${kullanıcı.id}`, 1)
    db.add(`cezapuan.${kullanıcı.id}`, 15)
    kdb.push(`sicil.${kullanıcı.id}`, {
    userID: kullanıcı.id,
    adminID: message.author.id, 
    Tip: "JAİL", 
    start: new Date(), 
    cezaID: cezaID })

    let sonceza = kdb.fetch(`sonceza.${kullanıcı.id}`)

    if(sonceza) return kdb.delete(`sonceza.${kullanıcı.id}`)

    if(!sonceza) {

setTimeout(async() => {

      await kdb.push(`sonceza.${kullanıcı.id}`, {
      userID: kullanıcı.id,
      adminName: message.member.displayName, 
      Tip: "JAİL", 
      start: new Date(),
      puan: "10",
      reason: sebep,
      cezaID: cezaID })
      }, 1500)  
    }

    db.add(`YetkiliPuan.${message.author.id}`, 15)
    kdb.set(`durum.${kullanıcı.id}.jail`, true)

    let cezapuan = db.fetch(`cezapuan.${kullanıcı.id}`)
    client.channels.cache.get("848995124041220137").send(`**${kullanıcı}** aldığı \`#${cezaID+1}\` numaralı ceza ile **${cezapuan}** ceza puanına ulaştı. (\`15\`)`)
    

let mbd = new Discord.MessageEmbed()
.setColor("8b0000")
.setAuthor(`[JAIL] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true }))
.setDescription(`• **Cezalanan Kullanıcı** : (\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`)\n• **Cezalandıran Yetkili** : (\`${message.author.tag}\` - \`${message.author.id}\`)\n• **Ceza Türü** : \`JAIL\`\n• **Ceza Sebebi** : \`${sebep}\`\n• **Ceza Süresi** : \`${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')}\`\n• **Cezalandırma Tarihi** : \`${new Date().toTurkishFormatDate()}\`\n• **Bitiş Tarihi** : \`${new Date(bitis).toTurkishFormatDate()}\` \n• **Ceza ID** : \`#${cezaID}\``);
let jaillogh = client.channels.cache.get(conf.jailLog)
client.channels.cache.get(jaillogh.id).send(mbd)



setTimeout(async () =>{  

  let y = await db.fetch(`rolleri.${kullanıcı.id}`)

message.guild.members.cache.get(kullanıcı.id).roles.add(y)
message.guild.members.cache.get(kullanıcı.id).roles.remove(conf.jailRol)
client.channels.cache.get(jaillogh.id).send(new Discord.MessageEmbed() .setAuthor(`[UNJAIL] ${message.member.user.tag}`, message.member.user.displayAvatarURL({ dynamic: true })) .setColor("GREEN") .setDescription(`(\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`) kullanıcısının (\`${message.author.tag}\` - \`${message.author.id}\`) tarafından verilen cezanın süresi bitti.\n**Cezalanma Tarihi** : \`${new Date(baslangic).toTurkishFormatDate()}\`\n**Bittiği Tarih** : \`${new Date(bitis).toTurkishFormatDate()}\``))
db.delete(`sicil.${kullanıcı.id}`)
db.delete(`rolleri.${kullanıcı.id}`)
}, ms(süre))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temp-jail','jail'],
  permLevel: 0
};

exports.help = {
  name: 'tempjail',
  description:'Kullanıcıyı cezalandırır.'
};
