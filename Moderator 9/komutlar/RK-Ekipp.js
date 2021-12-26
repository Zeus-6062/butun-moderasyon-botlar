const { MessageEmbed } = require("discord.js");

const config = require("../config.js");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`Kyle ❤️ Relly`)
    let rol = "830411321798688820"
    let tag = "Wio"
    let etiket = "1784" // etiketi # siz yazin
    message.guild.members.cache.filter(s => s.user.discriminator === etiket || s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    message.channel.send(embed.setDescription(`
Kullanıcı adında \`${tag}\` ve etiketinde \`#${etiket}\` bulunduran kullanıcılara rol veriliyor.
`))
}
exports.conf = { 
    enabled: true, 
    guildOnly: true, 
    aliases: ["1784"]
    }
    
    exports.help = {
    name: "1784" 
    }
