const Discord = require("discord.js");
const moment = require('moment');
require("moment-duration-format");
const ayarlar = require("../ayarlar.json"); // ayarlar olarak girildi siz istediğiniz yere göre düzeltin
moment.locale('tr');

exports.run = async (client, message, args) => {

    let mention = message.author;
    if(message.mentions.members.first()) mention = message.mentions.members.first().user;
    let mentionMember = message.guild.members.cache.get(mention.id);
    let slm = {
        web: 'İnternet Tarayıcısı',
        desktop: 'Masaüstü',
        mobile: 'Mobil'
      }
      let sa;
      if(mention.presence.status === "offline" || mention.bot) {
        sa = "Bağlandı yer gözükmemektir."
      } else {
        sa = slm[Object.keys(mention.presence.clientStatus)[0]];
      } 
    const jaus = new Discord.MessageEmbed()
    .setAuthor(`${mention.tag}`, mention.avatarURL({ dynamic: true}))
.setThumbnail(mention.avatarURL({ dynamic: true}))
.setDescription(`**➤ Kullanıcı bilgisi**
Kullanıcı ID **>** ${mention.id}
Profil **>** ${mention} ${mention.presence.status.replace('online', 'emoji').replace('idle', 'emoji').replace('dnd', 'emoji').replace('offline', 'emoji')}
Bağlandığı yer(ler) **>** ${sa}
Kuruluş Tarihi **>** ${moment(mention.createdAt).format('D/MMMM/YYYY')}

**➤ Kullanıcı bilgisi**
Takma Ad **>** ${mentionMember.displayName}
Sunucuya Giriş Tarihi **>** ${moment(mentionMember.joinedAt).format('D/MMMM/YYYY')}
Roller**>** ${(mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? mentionMember.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(',') : 'Hiç yok.')}
`)
.setFooter(mention.username, mention.avatarURL({dynamic: true}))
.setTimestamp()
.setColor("YELLOW")
message.channel.send(jaus)
 
};
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kb"],
  permLevel: 0
};
 
exports.help = {
  name: "kullanıcı-bilgi"
};
