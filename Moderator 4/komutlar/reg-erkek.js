const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const conf = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.kayıtcı) && !message.member.hasPermission(8)) return message.react(conf.carpi)

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp()

    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!kullanıcı) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).then(m => m.delete({ timeout: 7000 }))
    
    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!isim || !yaş) return message.channel.send(embed.setDescription(`${message.author}, Bir İsim Belirtmelisin.`)).then(m => m.delete({ timeout: 7000 }))
    let name = `• ${isim} | ${yaş}`
    if(kullanıcı.user.username.includes(conf.taG)) name = `${conf.taG} ${isim} | ${yaş}` 

    if (kullanıcı.id === client.user.id) return message.channel.send(embed.setDescription(`Beni Kayıt Edemezsin!`)).then(m => m.delete({ timeout: 7000 }))
    if (kullanıcı.id === message.author.id) return message.channel.send(embed.setDescription(`Kendini Kayıt Edemezsin!`)).then(m => m.delete({ timeout: 7000 }))
    if (kullanıcı.roles.cache.has(conf.erkekRolleri)) return message.channel.send(embed.setDescription(`Bu Kullanıcı Zaten Kayıtlı.`)).then(m => m.delete({ timeout: 7000 }))
    
    let isimveri = await db.get(`isimler.${kullanıcı.id}`)

   if(isimveri) {

        let isimler = isimveri.filter(kullanıcı => kullanıcı.userID === kullanıcı.id).map((value, index) => `\`${value.isim}\` **(**<@${value.yetkili}>**)** \`${new Date(value.zaman).toTurkishFormatDate()}\``).splice(0, 10)

        message.channel.send(embed.setDescription(`
        ${kullanıcı} kişisinin ismi başarıyla "${name}" olarak değiştirildi, <@&848956516388044854> <@&848956516388044853> <@&848956516388044852> rolleri verildi.

        ${isimler.join("\n") || "İsim verisi bulunamadı."}`)).then(m => m.delete({ timeout: 12000 }))

   } 
   if(!isimveri) { 

    message.channel.send(embed.setDescription(`
    ${kullanıcı} kişisinin ismi başarıyla "${name}" olarak değiştirildi, <@&848956516388044854> <@&848956516388044853> <@&848956516388044852> rolleri verildi.

    "Kullanıcı daha önceden kayıt olmamış."`)).then(m => m.delete({ timeout: 12000 }))
   }

    kullanıcı.roles.add(conf.erkekrolleri).catch(err => {})
kullanıcı.roles.remove(conf.kayıtsız).catch(err => {})
if(kullanıcı.user.username.includes(conf.taG)) kullanıcı.roles.add(conf.familyR)
kullanıcı.setNickname(name)

    await db.add(`teyit.${message.author.id}.erkek`, 1)
    await db.add(`teyit.${message.author.id}.toplam`, 1)

    await db.push(`teyit.${message.guild.id}`, { 
        eSayi: +1,
        tToplam: +1,
        Yt: message.author.id,
    })

    await db.push(`isimler.${kullanıcı.id}`, { 
    isim: name,
    gender: conf.erkekRolleri, 
    member: kullanıcı.id, 
    yetkili: message.author.id, 
    zaman: Date.now() })
}
exports.conf = {
    aliases: ['e']
};
exports.help = {
    name:'erkek'
}