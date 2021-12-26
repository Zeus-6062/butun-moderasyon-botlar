const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('yetkin yok')
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`Antidepresan`)
    let data = await db.get(`ekip.${message.guild.id}`) || []
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    let enaltyt = message.guild.roles.cache.get(ayarlar.kayıtcı)
    let tag = "31"
    if (args[0] === "ekle") {
        let hedefRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if (!hedefRol) return message.channel.send(embed.setDescription(`${message.author}, Geçerli bir rol belirtmelisin.`))
        if (data.includes(hedefRol.id)) return message.channel.send(embed.setDescription(`Bu ekip zaten sistemde mevcut.`))
        db.push(`ekip.${message.guild.id}`, hedefRol.id, )
        message.channel.send(embed.setDescription(`${message.author} Ekip başarıyla eklendi, Ekip rolü: ${hedefRol}`))
    }
    if (args[0] === "sil") {
        let hedefRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if (!hedefRol) return message.channel.send(embed.setDescription(`${message.author}, Geçerli bir rol belirtmelisin.`))
        if (!data.includes(hedefRol.id)) return message.channel.send(embed.setDescription(`Bu ekip zaten sistemde zaten yok.`))
        if (data.length === 1) {
            db.delete(`ekip.${message.guild.id}`)
            message.channel.send(embed.setDescription(`${hedefRol} Rolü ekip sisteminden kaldırıldı!`))
        } else {
            db.set(`ekip.${message.guild.id}`, data.filter(s => s !== hedefRol.id))
            message.channel.send(embed.setDescription(`${hedefRol} Rolü ekip sisteminden kaldırıldı.`))
        }
    }
    if (args[0] === 'say') {
        if (!data) return message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setDescription(`Ekip bilgileri bulunmamaktadır.`))
        let x = data.map(data => `\`•\` ${message.guild.roles.cache.get(data)} **bilgilendirme;**\n \`•\` Toplam üye: ${message.guild.members.cache.filter(s => s.roles.cache.has(data)).size}\n \`•\` Çevrimiçi üye: ${message.guild.members.cache.filter(s => s.roles.cache.has(data) && s.presence.status !== "offline").size}\n \`•\` Sesteki üye: **${message.guild.members.cache.filter(s => s.roles.cache.has(data) && s.voice.channel).size}**`).slice(0, 17).join("\n\n")
        message.channel.send(embed.setDescription(`${x || 'yok'}`))
    }
    if (!args[0]) {
        message.channel.send(embed.setDescription(`
\` > \` **.ekip ekle** Sisteme ekip eklersiniz.
\` > \` **.ekip sil** Sistemden ekip silersiniz.
\` > \` **.ekip tüm** Sistemdeki tüm ekip bilgilerini görüntülersiniz.
\` > \` **.ekip @ekiprol** Etiketlediğiniz ekip'in detaylı bilgilerini görüntülersiniz.
`))
    }
    if (rol) {
        if (args[0] === "sil") return;
        if (args[0] === "ekle") return;
        if (args[0] === "tüm") return;
        if (!data.includes(rol.id)) return;
        message.channel.send(embed.setDescription(`
        \` > \` ${message.guild.roles.cache.get(rol.id)} Ekibinin sunucu içi aktiflik durumu;
        \` > \` Toplam sahip oldukları üye sayısı: \`${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).size}\`
        \` > \` Aktif olup seste olmayan ekip üyelerinin miktarı: \`${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && !s.voice.channel && s.presence.status !== 'offline').size}\`
        \` > \` Sunucumuzda yetkili olan ekip üyelerinin miktarı: \`${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).filter(x => x.roles.highest.position >= enaltyt.position).size}\`
        \` > \` Sunucumuzda ses kanallarında bulunan ekip üyelerinin miktarı: \`${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.voice.channel).size}\`
        \` > \` Sunucumuzda tagımızı alan bizi destekleyen ekip üyelerinin miktarı: \`${message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.user.username.includes(tag)).size}\`
        `))
    }

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
};
exports.help = {
    name:'ekip'
}