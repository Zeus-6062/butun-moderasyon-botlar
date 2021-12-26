const Discord = require('discord.js');
const config = require('../config.js')

exports.run = async (client, message, args) => {

let member = message.mentions.users.first() ||  message.guild.members.cache.get() || message.author;
message.channel.send(new Discord.MessageEmbed()
.setAuthor(member.tag, member.displayAvatarURL({ dynamic: true }))
.setTitle('Avatar')
.setImage(member.displayAvatarURL({ dynamic: true, size: 512 })));
                     
 }
 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatar', 'av'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  kategori: 'avataar komudu'
};