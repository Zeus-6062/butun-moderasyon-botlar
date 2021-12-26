const Discord = require('discord.js');
const ayar = require('../ayarlar.json');

 exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.react(ayar.carpi)
 let uye = message.mentions.members.first()

 if(!uye) return message.channel.send(`Kimin Takma Adını Değiştireceğini Belirtmelisin.`)
 const isim = args[1]
 const yaş = args[2]
 if(isim && yaş) return message.reply(`İsim ve yaşı doğru gir!`).then(g => g.delete({ timeout: 2345 }))
 uye.setNickname(`${ayar.taG} ${isim} ' ${yaş}`)

message.channel.send(new Discord.MessageEmbed()
 .setColor("GREEN")
 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
 .setDescription(`(\`${uye.user.tag}\` - \`${uye.id}\`) üyesinin takma adı, (\`${message.author}\` - \`${message.author.id}\`) tarafından değiştirildi. (\`${nick}\`)`));
 };
  
  exports.conf = {
    enabled: true,
guildOnly:true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "nick",
    description:"Kullanıcının takma adını değiştirir."
  };