const Discord = require("discord.js")
const moment = require("moment")
const db = require("quick.db")
const osettings = require("../config.js")

module.exports.run = async(client,message,args) => {
const guild = message.member.guild
let executor = message.member
let cezalar = [];

moment.locale("tr")
//Embed açalım bitane
let oziemb = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({dynamic: true}))
    .setFooter("Relly", executor.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
console.log(args[2])
//Gerekli Rol İdleri buraya
let yetkili = osettings.yetkili; "818488108085149705";   //bukomutukullanabilmeyetkiliid
//Rolün ismini alak bide



//Rol Kontrolu
if(!executor.hasPermission("ADMINISTRATOR") && !executor.roles.cache.has(yetkili)) {
    return message.channel.send(oziemb.setDescription(`**Bu komutu kullanabilmek için ${yetkilirolismi} rolüne sahip olmalısınız.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let sorgu = args[0]
if(sorgu == "yardım" || sorgu == "yardim" || !sorgu){
    return message.channel.send(oziemb
        .setDescription(`**Cezabilgi Komutu Bilgilendirmesi
● Belli Bir Numaradaki Ceza Hakkında Bilgi Almak İçin:
\`cezabilgi cezano\`        
● Bir kişinin son cezalarını görüntülemek için:
\`cezabilgi id/@etiket\`
● Sunucudaki son 10 cezayı görmek için:
\`cezabilgi son\`
● En çok ceza alanları görmek için: 
\`cezabilgi top\`
● En çok ceza verenleri görmek için:
\`cezabilgi topceza\`
● Bu komuta erişim için:
\`cezabilgi yardım\`**`)
        .setColor("#1A5BE3"));
    }
if(sorgu == "son"){
x = db.fetch(`CezaNo_${guild.name}`)
let tru;
x > 10 ? tru = "10" : tru = `${x}`
let descript = `**CezaBilgi Son ${tru} Ceza\n\n CezaNo / Cezalanan Kişi / Tür\n`
for(i = x; i > (i - 10) && i > 0; i--){
let ceza = await db.fetch(`Ceza_${i}_${guild.name}`)
kisi = await client.users.fetch(ceza.cezalanan).catch(err => console.log(err)) || `<@!${ceza.cezalanan}>`
let z = `● \`${ceza.no}\` / ${kisi} / ${ceza.tur}\n` 
descript += z;
}
descript += `**`
return message.channel.send(oziemb.setDescription(descript).setColor("RED"));
}


if(sorgu == "top") {
x = db.fetch(`CezaNo_${guild.name}`)
let cezayiyenler = []

for (i = x; i > 0; i--) {
    let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
    if(!cezayiyenler.includes(ceza.cezalanan)){
    cezayiyenler.push(ceza.cezalanan)
}  
}

let y = cezayiyenler.length
let index = 0;
for(i = 0; i < i + 10 && i < cezayiyenler.length; i++){
    
    let sorgukisi = cezayiyenler[i]
    for (j = x; j > 0; j--) {
        let ceza = db.fetch(`Ceza_${j}_${guild.name}`)
        if(ceza.cezalanan == sorgukisi) {
            db.add(`Index_${index}`, 1)
        }
      }
    index += 1;
    if(i == 0) {
        db.set(`Index_${guild.name}`, index);
    }
}
let kisilerfinal = [];
for(i = y - 1; i >=0; i--){
    kisilerfinal.push([db.fetch(`Index_${i}`), cezayiyenler[i]])
    db.delete(`Index_${i}`)
}
await kisilerfinal.sort(function(a,b) {return b[0] - a[0]})
let descript = `**CezaBilgi En Çok Cezalananlar\n\n Kişi / Kişi Bilgi / Ceza Sayısı \n\n`
for(i = 0;i <= i + 9 && i < kisilerfinal.length; i++){
console.log(kisilerfinal[i]);
let kisi = await client.users.fetch(kisilerfinal[i][1]).catch(err => console.log(err)) || "Bulunamayan Üye/Bot Sahibi"
let kisibilgi;
if(kisi != `\`Bulunamayan Üye/Bot Sahibi\`` && kisi.username) kisibilgi = `${kisi.username}(\`${kisi.id}\`)`; else console.log(kisi.username);
if(!kisibilgi) kisibilgi = "Bilinmiyor"
descript += `${kisi} / ${kisibilgi} / \`${kisilerfinal[i][0]}\` toplam ceza\n`

}

descript += "**";
return message.channel.send(oziemb.setDescription(descript).setColor("RANDOM"));
}
if(Number(args[0]) && args[0].length < 15) {
let ceza = await db.fetch(`Ceza_${args[0]}_${guild.name}`)
if(!ceza){
    return message.channel.send(oziemb.setDescription(`**\`${args[0]}\` numarasında bir ceza bu sunucuda bulunamadı.**`).setColor("RED")).then(x => x.delete({timeout:6500}));
}
let kisi = await client.users.fetch(ceza.cezalanan).catch(err => console.log(err)) || "Bulunamayan Üye/Bot Sahibi"
let kisibilgi;
console.log(kisi)
if(kisi != `\`Bulunamayan Üye/Bot Sahibi\`` && kisi.username) kisibilgi = `${kisi.username}(${kisi.id})`; else console.log(kisi.username);
if(!kisibilgi) kisibilgi = "Bilinmiyor"

let kisi2 = await client.users.fetch(ceza.cezalandiran).catch(err => console.log(err)) || "Bulunamayan Üye/Bot Sahibi"
let kisibilgi2;
if(kisi2 != `\`Bulunamayan Üye/Bot Sahibi\`` && kisi2.username) kisibilgi2 = `${kisi2.username}(${kisi2.id})`; else console.log(kisi2.username);
if(!kisibilgi2) kisibilgi2 = "Bilinmiyor"
if(!ceza.baslamatarihi) {
    ceza.bitistarihi = ceza.tarih
    ceza.baslamatarihi = ceza.tarih
}
return message.channel.send(oziemb
    .setDescription(`**Cezabilgi ${args[0]} Bilgilendirmesi
● Cezalanan Kişi: ${kisi} 
● Cezalanan Kişi Bilgisi: \`${kisibilgi}\`        
● Cezayı Veren Kişi: ${kisi2}  
● Cezalanan Kişi Bilgisi: \`${kisibilgi2}\`\n
● Türü: ${ceza.tur}
● Sebebi: ${ceza.sebep} 
● Başlangıç Tarihi: \`${ceza.baslamatarihi}\`
● Bitiş Tarihi: \`${ceza.bitistarihi}\`**`)
    .setColor("#1A5BE3"));
}

if(sorgu == "topceza") {
    x = db.fetch(`CezaNo_${guild.name}`)
    let cezalandıranlar = []
    
    for (i = x; i > 0; i--) {
        let ceza = db.fetch(`Ceza_${i}_${guild.name}`)
        if(!cezalandıranlar.includes(ceza.cezalandiran)){
            cezalandıranlar.push(ceza.cezalandiran)
    }  
    }
    
    let y = cezalandıranlar.length
    let index = 0;
    for(i = 0; i < i + 10 && i < cezalandıranlar.length; i++){
        
        let sorgukisi = cezalandıranlar[i]
        for (j = x; j > 0; j--) {
            let ceza = db.fetch(`Ceza_${j}_${guild.name}`)
            if(ceza.cezalandiran == sorgukisi) {
                db.add(`CIndex_${index}`, 1)
                if(ceza.tur == "Ban")  db.add(`CBIndex_${index}`, 1);
                if(ceza.tur == "Mute")  db.add(`CMIndex_${index}`, 1);
                if(ceza.tur == "Jail")  db.add(`CMIndex_${index}`, 1)
            }
          }
        index += 1;
        if(i == 0) {
            db.set(`CIndex_${guild.name}`, index);
        }
    }
    let kisilerfinal = [];
    for(i = y - 1; i >=0; i--){
        console.log(cezalandıranlar[i])
        let a,b,c;
        a = db.fetch(`CBIndex_${index}`) || 0
        b = db.fetch(`CJIndex_${index}`) || 0
        c = db.fetch(`CMIndex_${index}`) || 0
        console
        kisilerfinal.push([db.fetch(`CIndex_${i}`), a,b,c, cezalandıranlar[i]])
        db.delete(`CIndex_${i}`)
        db.delete(`CBIndex_${i}`)
        db.delete(`CJIndex_${i}`)
        db.delete(`CMIndex_${i}`)
    }
    console.log(kisilerfinal)
    await kisilerfinal.sort(function(a,b) {return b[0] - a[0]})

    let descript = `**CezaBilgi En Çok Ceza Verenler\n\n Kişi / Kişi Bilgi / Ceza Sayısı \n\n`
    for(i = 0;i <= i + 9 && i < kisilerfinal.length; i++){
    let kisi = await client.users.fetch(kisilerfinal[i][4]).catch(err => console.log(err)) || "Bulunamayan Üye/Bot Sahibi"
    let kisibilgi;
    if(kisi != `\`Bulunamayan Üye/Bot Sahibi\`` && kisi.username) kisibilgi = `${kisi.username}(\`${kisi.id}\`)`; else console.log(kisi.username);
    if(!kisibilgi) kisibilgi = "Bilinmiyor"
    descript += `${kisi} / ${kisibilgi} / \`${kisilerfinal[i][0]}\` toplam ceza\n`
    
    }
    
    descript += "**";
    return message.channel.send(oziemb.setDescription(descript).setColor("RANDOM"));

}
if(message.guild.members.cache.get(args[0]) || message.mentions.members.first() || args[0].length == 18){
    let z = message.mentions.members.first() || await client.users.fetch(args[0]).catch(err => console.log(err))
    let k;
    z ? k = z.id : k = args[0]
    x = db.fetch(`CezaNo_${guild.name}`)
    let descript = `**CezaBilgi <@!${k}>\`(${k})\` Son Cezaları\n\n CezaNo / Tür / Sebep\n`
    for(i = x; i > (i - 10) && i > 0; i--){
    let ceza = await db.fetch(`Ceza_${i}_${guild.name}`)
    if(ceza.cezalanan != k) continue;
    let z = `● \`${ceza.no}\` / ${ceza.tur} / ${ceza.sebep}\n` 
    descript += z;
    }
    descript += `**`
    return message.channel.send(oziemb.setDescription(descript).setColor("RED"));



}  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sicil', 'ceza-bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'cezabilgi',
};