const Discord = require('discord.js');
exports.run = function(client, message, args) {
  //Yuri
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
   new Discord.MessageEmbed()
   .setDescription(`Komutu kullanan kullanıcııda yetki bulunamadı!`))
  
   if(!args[0]) return message.channel.send(
   new Discord.MessageEmbed()
     .setColor("#2e0101")
   .setDescription(`Sileceğin miktarı yaz`));

   message.channel.bulkDelete(args[0]).then(() => {
   message.channel.send(
   new Discord.MessageEmbed()
     .setColor("#2e0101")
      .setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic: true }))
   .setDescription(`${args[0]}\` mesaj silindi.`)).then(msg => msg.delete(1500));
})
}
exports.conf = { 
  aliases: ['sil','s'],
};
exports.help = {
  name:'sil',
};