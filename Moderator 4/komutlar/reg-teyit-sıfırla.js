const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const conf = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.kayıtcıRol) && !message.member.hasPermission(8)) return message.react(conf.carpi)

    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp()
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`)).then(qwe => qwe.delete({ timeout: 5000 }))
    if (uye) {
        db.delete(`teyit.${uye.id}.toplam`)
        db.delete(`kayıt.${uye.id}.kadın`)
        db.delete(`kayıt.${uye.id}.erkek`)
        message.channel.send(embed.setDescription(`${uye} Üyesinin Kayıt Verileri Sıfırlandı`)).catch().then(sj => sj.delete({ timeout: 15000 }))
    }
}
exports.conf = {
    aliases: ['t-s']
};
exports.help = {
    name:'teyit-sıfırla',
    description:'Kullanıcının teyit verilerini temizler.'
}