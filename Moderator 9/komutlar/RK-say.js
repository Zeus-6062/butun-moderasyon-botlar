const Discord = require("discord.js");
const config = require('../config.js')
exports.run = async (client, message, args) => {   

let Tag = "Wio" //Tagınız
let Tagg = "wio"
let Taggg = "wio."
let Tagggg = "wio?"
let Taggggg = "WİO"
let Etiket = "1784" //etiket tagı 0001 gibi

   let TotalMember = message.guild.memberCount
          let Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          let Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          let Taglıı = message.guild.members.cache.filter(u => u.user.username.includes(Tagg)).size;
          let Taglııı = message.guild.members.cache.filter(u => u.user.username.includes(Taggg)).size;
          let Taglıııı = message.guild.members.cache.filter(u => u.user.username.includes(Tagggg)).size;
          let Taglııııı = message.guild.members.cache.filter(u => u.user.username.includes(Taggggg)).size;
          let Etiketiniz = message.guild.members.cache.filter(u => u.user.discriminator.includes(Etiket)).size;
          let toplamTag = Etiketiniz + Taglı + Taglıı + Taglııı + Taglıııı + Taglııııı
          let Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          let Boost = message.guild.premiumSubscriptionCount;

message.channel.send(new Discord.MessageEmbed().setDescription(`
<a:wio_yldz:830900022970548264> Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
<a:wio_yldz:830900022970548264> Sunucumuzda toplam **${Online}** aktif kullanıcı bulunmaktadır.
<a:wio_yldz:830900022970548264> Toplam **${toplamTag}** kişi tagımızda bulunuyor.
<a:wio_yldz:830900022970548264> Seste **${Voice}** kullanıcı bulunmaktadır.
<a:wio_yldz:830900022970548264> Sunucuya toplam **${Boost}** takviye yapılmıştır.
`))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say","info","bilgi"],
  permLevel: 0
};
exports.help = {
  name: 'say',
  description: '',
  usage: 'say'
};