const db = require('quick.db');
const Discord = require('discord.js');
const moment = require('moment')
const config = require('../config.js')
moment.locale('tr')

exports.run = async (client, message, args) => {      

 let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#4c0000').setTimestamp()
        let embed2 = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor('#621e02')
        let channel = client.guilds.cache.get(config.serverid).channels.cache.find(c => c.name === "yetki-ver-log")
        if (!message.member.roles.cache.some(r => [config.responsible].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))  {return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 3000 }))} 
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı etiketlenmedi veya bulunamadı!")).then(x => x.delete({ timeout: 5000 }))
        if (!member.user.username.includes(config.tag)) {return message.channel.send(embed.setDescription("Yetkili olucak kullanıcıda tag bulunmak zorunda")).then(x => x.delete({ timeout: 5000 }))}
        if (db.get(`staff_${member.id}`)) return message.channel.send(embed.setDescription("Belirtilen kullanıcı sunucuda zaten yetkili!").setFooter("Bir aksilik var ise üst yönetime ulaşınız!"))
        if(args[1] === "yetki1") {
                db.set(`staff_${member.id}`, true)
                await message.guild.members.cache.get(member.id).roles.add(config.denemeyetkili)
                message.channel.send(embed.setDescription(`Kullanıcı 1. yetkiye yükseltildi. Kullanıcıya <@&>, <@&>, <@&> rolleri verildi!`))
                channel.send(embed.setDescription(` ${member} adlı kullanıcı ${message.author}  tarafından 1. yetkiye \`${moment().format('LLL')}\` tarihinde yükseltildi`))          
          }
        if(args[1] === "yetki2") {
                await message.guild.members.cache.get(member.id).roles.remove(config.yetkilirol)
                await message.guild.members.cache.get(member.id).roles.add(client.config.staff2)
                message.channel.send(embed.setDescription(`Kullanıcı 2. yetkiye yükseltildi. Kullanıcıya <@&>, <@&>, <@&> rolleri verildi!`))
                channel.send(embed.setDescription(` ${member} adlı kullanıcı ${message.author}  tarafından 2. yetkiye \`${moment().format('LLL')}\` tarihinde yükseltildi`))
          }
        if(args[1] === "yetki3") {
                await message.guild.members.cache.get(member.id).roles.remove(config.staff2)
                await message.guild.members.cache.get(member.id).roles.add(client.config.staff3)
                message.channel.send(embed.setDescription(`Kullanıcı 3. yetkiye yükseltildi. Kullanıcıya <@&>, <@&>, <@&> rolleri verildi!`))
                channel.send(embed.setDescription(` ${member} adlı kullanıcı ${message.author}  tarafından 3. yetkiye \`${moment().format('LLL')}\` tarihinde yükseltildi`))
          }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['staff', 'yt'],
  permLevel: 0
};

exports.help = {
  name: 'yetkilial',
  kategori: 'yetkili'
};
