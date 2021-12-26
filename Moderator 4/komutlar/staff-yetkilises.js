const  Discord = require("discord.js");
const conf = require('../ayarlar.json');

exports.run = async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL());
        if (!message.member.hasPermission(8)) return message.react(conf.carpi)
        
        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(conf.kayıtcı)).filter(s => !s.voice.channel).map(s => s).join('\n')
        let sesteolan = message.guild.members.cache.filter(s => s.roles.cache.has(conf.kayıtcı)).filter(s => s.voice.channel).map(s => s).join('\n')
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor("Sesteki Yetkililer", message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`Sestekiler; \n${sesteolan || "Kimse yok"}\n\nSeste olmayanlar;\n${sesteolmayan || "Kimse yok"}`)
            .setColor("RED")).then(qwe => qwe.delete({ timeout: 10000 }))
    }

    exports.conf = {
   aliases:["yses"]
    }

    exports.help = {
        name:'yetkilises'
    }