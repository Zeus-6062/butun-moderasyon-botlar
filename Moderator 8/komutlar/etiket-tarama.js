const Discord = require("discord.js"); 

module.exports.run = async (client, message, args) => {

let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
let discrim = args[0]
let tagRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
if(!discrim) return message.channel.send(embed.setDescription(`**Geçerli bir Etiket belirtmelisin.**\n *Örnek Kullanım:* \`.etiket-tarama [Etiket Sayısı] [Family ID]\``)).then(x => x.delete({timeout: 6500}))
if(!tagRole) return message.channel.send(embed.setDescription(`**Geçerli bir Rol ID girmelisin.**\n *Örnek Kullanım:* \`.etiket-tarama [Etiket Sayısı] [Family ID]\``)).then(x => x.delete({timeout: 6500}))
    message.guild.members.cache.forEach(arx => {
    if (arx.user.discriminator.includes(discrim)) {
    arx.roles.add(tagRole)
    }})
message.channel.send(embed.setDescription(`**Başarıyla \`${discrim}\` etiketine sahip üyelere  ${tagRole} rolü verilmiştir.**`))
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["etiket-tarama"],
  permLevel: 0,
}

exports.help = {
  name: "etikettarama"
};