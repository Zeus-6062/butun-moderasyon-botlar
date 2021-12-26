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

if(member) { 

    let data = await kdb.fetch(`uyarı.${member.id}`)

        if(!data) {
            message.channel.send(embed.setDescription(`Veri bulunamadı.`)).then(sjsj => sjsj.delete({ timeout: 3500 })) 
        } 

    if(data) {

        let uyarıbilgi = data.map((data, index) => `\`${index +1}.\` **(**<@${data.Staff}>**)** **(**${data.Sebep}**)** (\`${new Date(data.Date).toTurkishFormatDate()}\`)`)

        message.channel.send(new MessageEmbed() .setDescription(`
        ${uyarıbilgi.join('\n') || "Kullanıcı daha önceden uyarı almamış."}
        `)) } 
}
};

exports.conf = {
    aliases:["warninfo"]
};

exports.help = {
    name:'uyarıbilgi'
}