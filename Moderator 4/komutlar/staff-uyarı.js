const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const kdb = new db.table("ceza")
exports.run = async function(client, message, args) {

let embed = new MessageEmbed() .setColor("GREEN") .setTimestamp()
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.carpi)
if(!member) { message.react(ayarlar.carpi)
 message.channel.send(`Kullanıcı etiktle.`).then(sjsj => sjsj.delete({ timeout: 3000 }))
}

let reason = args[1]

if(member) { 
    db.push(`uyarı.${member.id}.size`, 1)
    db.add(`YetkiliPuan.${message.author.id}`, 2)
    kdb.push(`uyarı.${member.id}`, { 
        uyariSize: +1,
        Staff: message.author.id,
        Sebep: reason,
        Date: new Date(),
    })
uyarılar = db.fetch(`uyarı.${member.id}.size`)
message.channel.send(embed.setDescription(`<@${member.id}> adlı kullanıcı <@${message.author.id}> tarafından uyarıldı. \`${uyarılar.toString()}\``))

}

};

exports.conf = {
    aliases:["warn","uyarı"]
};

exports.help = {
    name:'uyar'
}