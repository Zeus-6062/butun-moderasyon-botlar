const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  let mutluemb = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("ff0000")
 
  if(message.author.id !== ayarlar.sahip)
  if(!message.member.hasPermission("ADMINISTRATOR"))
  if(!message.member.hasPermission("BAN_MEMBERS")) return  message.react(ayarlar.carpi)
 
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

  var vip  = message.guild.roles.cache.get(ayarlar.vipRol)

  if(!member) return message.channel.send(mutluemb.setDescription("Lütfen bir kullanıcı etiketleyiniz.")).then(x => x.delete({timeout: 5000}));

  if(!vip) return
if(!member.roles.cache.get(vip.id)){
  await (member.roles.add(vip.id));

  message.channel.send(mutluemb.setDescription(`${member}, kişisine <@&${vip.id}> rolü başarıyla verildi.`))

}
  else {
    await (member.roles.remove(vip.id));


    message.channel.send(mutluemb.setDescription(`${member}, kişisinden <@&${vip.id}> rolü başarıyla alındı.`))


  }
}
  exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['vip'],
    permLevel: 0 
  };
  
  exports.help = {
    name: 'vip', 
    description: 'Etiketlediğin Kullanıcıya sunucuda VIP verir.', 
    usage: '.vip @mutlu/ıd' 
  };