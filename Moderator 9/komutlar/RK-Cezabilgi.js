const { MessageEmbed } = require("discord.js");
const ayar = require("../config.js")
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
      if(!message.member.roles.cache.get(ayar.jail) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(new MessageEmbed().setColor('RANDOM').setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Üye Girmelisin \n Örnek Kullanım:`Relly/ID`"))

let cezabilgi = db.get(`kullanici.${user.id}.cezabilgi`) || [];
let cezaSiralama = cezabilgi.length > 0 ? cezabilgi.map((value, index) => `${index + 1}. (${value.Ceza}) ${user}, <@${value.Yetkili}> **${value.Sebep}** sebebi ile cezalandırılmış.`).join("\n") : "Bu üyenin ceza bilgisi mevcut değil.";
let embed = new MessageEmbed()
.setColor('RANDOM')
.setAuthor(message.author.username , message.author.avatarURL({ dymaic: true}))
.setDescription(`
${user} üyesinin toplamda, **${cezabilgi.length}** Cezası Bulunmakta. 

${cezaSiralama}`)

message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ceza-bilgi"],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'cezabilgi'
    
  }