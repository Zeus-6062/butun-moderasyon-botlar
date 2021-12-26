const { MessageEmbed } = require("discord.js");
const cfg = require("../config.js");

module.exports.run = (client, message, args) => {
  
  let vegasembed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  const member = message.guild.member(user) || message.guild.members.cache.get(args[0])
  if(member.presence.status === "offline") return message.channel.send(vegasembed.setDescription(`Aktif olmayan bir kullanıcının cihazına bakamazsın.`))
  let p = Object.keys(member.presence.clientStatus).join(',')
  let cihazisim = p
  .replace(`mobile`,`Mobil Telefon`)
  .replace(`desktop`,`Bilgisayar (Uygulama)`)
  .replace(`web`,`İnternet Tarayıcısı`)
  message.channel.send(`${user.tag.replace("`","")} üyesinin şuanda kullandığı cihaz: \`${cihazisim}\``);
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cihaz"],
  permLevel: 0,
}

exports.help = {
  name: "cihaz"
};