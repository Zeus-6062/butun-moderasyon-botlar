const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first()
} else {
member = message.member;

}

let lightmind = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar (Uygulama)',
  mobile: 'Mobil'
}

let durum = (member.user.presence.status).replace('dnd', 'Rahatsız etmeyin.').replace('idle', 'Boşta.').replace('online', 'Çevrimiçi.').replace('offline', 'Çevrimdışı.');
let uyy;
if(member.user.presence.status !== 'offline') {
uyy = ` Bağlandığı cihaz: ${lightmind[Object.keys(member.user.presence.clientStatus)[0]]}` } else { uyy = '' }
message.channel.send(new Discord.MessageEmbed().setColor('2f3136').setTimestamp().setFooter(`Komudun kullanıldığı saat:`).setAuthor(message.author.tag, message.author.avatarURL ({ dynamic : true })).setDescription(`<@${member.user.id}> **kullanıcısının durumu**: \`${durum}${uyy}\``))

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["cihaz"],
    permLevel: 0,
  }
  
  exports.help = {
    name: "cihaz"
  };