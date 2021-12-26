const Discord = require('discord.js');

exports.run = async (client, message, args) => {

const hyperinembedi = new Discord.MessageEmbed()
.setColor("RANDOM")//Embedin Rengi
.setDescription("Komutları Felan Yaz")
.setTimestamp()//Embedin Altında Saati Gösterir
.setFooter("Made By Relly")//Embedin Altı
message.channel.send(hyperinembedi)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['help'],
    permLevel: 0,  
  };
  
  exports.help = {
    name: 'yardım',
    description: 'Simply Code Yardım Komutu',
    usage: 'prefix + yardım ',
  };