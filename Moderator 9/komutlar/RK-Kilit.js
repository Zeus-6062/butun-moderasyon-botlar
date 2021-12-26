const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
var KanalDurum; if(message.channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) KanalDurum = "Açık"; if(!message.channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) KanalDurum = "Kilitli";
  if (!message.member.permissions.has("ADMINISTRATOR")) return;
    let secim = args[0];
if (!secim) return message.channel.send(embed.setDescription(`Bir argüman girmelisin \`.kanal kilit\` veya \`.kanal aç\` yazmalısınız. `).setFooter(`Kanal Durum: ${KanalDurum}`))
 if (secim === "kilit") {
message.channel.send(embed.setDescription(`:lock: Kanal kilitlendi`))
 message.channel.updateOverwrite(message.guild.roles.everyone, {  
SEND_MESSAGES: false
})
}

if(secim === "aç") {
message.channel.send(embed.setDescription(`:unlock: Kanal açıldı`))
 message.channel.updateOverwrite(message.guild.roles.everyone, {  
SEND_MESSAGES: null
})
}

}
exports.conf = {
  aliases: ['kanal'],
  permLevel: 0
};

exports.help = {
  name: 'kanal'
};