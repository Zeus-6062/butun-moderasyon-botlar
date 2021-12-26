const Discord = require('discord.js');

exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("⛔ Bu Komutu Kullanabilmek İçin **KANALLARI YÖNET** Yetkisine Sahip Olman Gerek.");
message.channel.clone().then(kanal=> {
  let position = message.channel.position;
  kanal.setPosition(position);
  message.channel.delete();
const embed = new Discord.MessageEmbed()
.setTitle('Kanal Başarıyla Yeniden Oluşturuldu!')
//.setImage('https://media1.giphy.com/media/oe33xf3B50fsc/giphy.gif')
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
kanal.send(embed)
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nuke","nuk","nk"],
  permLevel: 0
};

exports.help = {
    name: 'nuke'
};