const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../config.js");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('2F3136').setTimestamp().setFooter(`Relly`)
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(s => s.name.toLowerCase().includes(args[1]))
    if (!uye) return message.channel.send(embed.setDescription(`Bir Kullanıcı Etiketlemelisin.`))
    if (!rol) return message.channel.send(embed.setDescription(`Bir Rol Belirtmelisin.`))
    if (uye.roles.cache.has(rol.id)) {
        uye.roles.remove(rol.id)
        message.channel.send(embed.setDescription(`${uye} Adlı Kullanıcıdan ${rol} rolü alındı`))
    }
    if (!uye.roles.cache.has(rol.id)) {
        uye.roles.add(rol.id)
        message.channel.send(embed.setDescription(`${uye} Adlı Kullanıcıya ${rol} rolü verildi`))

    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rol"],
    permLevel: 0
    };
    
    exports.help = {
    name: "rol",
    description: "[Admin Komutu]",
    usage: "rol"
    };