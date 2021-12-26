const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const conf = require('../ayarlar.json');
exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.kayıtcıRol) && !message.member.hasPermission(8)) return message.react(conf.carpi)

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let embed = new MessageEmbed().setTimestamp().setColor('RANDOM')
    if (!uye) return message.channel.send(embed.setDescription(`${message.author}, Bir Kullanıcı Etiketlemelisin.`)).then(m => m.delete({ timeout: 7000 }))

    if (uye.id === client.user.id) return message.channel.send(embed.setDescription(`Beni Kayısıza atamazsın!`))
    if (uye.id === message.author.id) return message.channel.send(embed.setDescription(`Kendini Kayıtsıza Atamazsın!`))
    uye.roles.set([conf.kayıtsız])
    uye.setNickname(`İsim | Yaş`)
    message.channel.send(embed.setDescription(`${uye} Adlı Kullanıcı ${message.author} Tarafından Başarıyla Kayıtsıza Atıldı.`)).then(x => x.delete({ timeout: 7000 }))
}
exports.conf = {
    aliases: ['unreg','unregistered']
};
exports.help = {
    name:'kayıtsız',
    description:'Kullanıcıyı kayıtsıza atar.'
}