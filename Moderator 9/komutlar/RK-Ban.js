const Discord = require("discord.js");
const ayar = require("../config.js")
const db = require("quick.db")
const moment = require("moment")
module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.get(ayar.banhammer) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Üye Girmelisin \n Örnek Kullanım:`.ban Relly/ID`"))

  if(message.author.id === user.user.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Kendinden Üsteki Yetkiliyi Banlıyamaz.")).then(msg => msg.delete(9000))
    if(message.author.id === user.user.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Kendini Banlıyamazsın.")).then(msg => msg.delete(9000))
  

let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş."
if(!reason) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Sebep Girmelsin!"))
  db.add('id',1)
  let banid = db.fetch('id')
  
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setAuthor(message.author.username, message.author.avatarURL({ dyamic: true }))
  .setDescription(`${user} üyesi, ${message.author} Tarafından **${reason}** Sebepi İle Sunucudan Yasaklandı (Ceza Numarası: \`#${banid-(-1)}\`)`)
  message.channel.send(embed)
user.ban({reason: reason})

const banlogs = new Discord.WebhookClient(ayar.banlogid, ayar.banlogtoken)
banlogs.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription(`
${user} Üyesi, ${message.author} Tarafından ${reason} Sebepi İle Sunucudan Yasaklandı (Ceza Numarası: \`#${banid-(-1)}\` )

\`▸ Ban Atılış Tarihi:\` ${moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')}
\`▸ Sebep:\` ${reason}


`))
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban"],
  permLevel: 0,
}

exports.help = {
  name: 'infaz'
  
}