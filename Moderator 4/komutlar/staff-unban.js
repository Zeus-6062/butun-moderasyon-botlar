const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require('moment')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\  
  
if(!["848956516400889928"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('BLACK').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

const banlog = message.guild.channels.cache.find(c => c.id === ayarlar.banLog)//Ban Log 

//-------------------------------------------------------------------------------\\

  
          let tumaylar = {
        "01": "Ocak",  
        "02": "Şubat", 
        "03": "Mart",  
        "04": "Nisan",  
        "05": "Mayıs", 
        "06": "Haziran", 
        "07": "Temmuz",
        "08": "Ağustos", 
        "09": "Eylül", 
        "10": "Ekim", 
        "11": "Kasım", 
        "12": "Aralık", 
        }
  let aylar = tumaylar;
  
let kisi = await client.users.fetch(args[0]);
if(!kisi) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bir ID girmelisin.`).setColor('BLACK').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

message.guild.members.unban(kisi.id)
message.channel.send(new MessageEmbed().setDescription(`${message.author} tarafından ${kisi} adlı kullanıcının sunucu yasağı kaldırıldı.`).setColor('BLACK').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic:true }))).then(x => x.delete({ timeout: 5000}))
  
message.react(ayarlar.tik)
banlog.send(new MessageEmbed().setColor('BLACK').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()
.setDescription(`**(**${message.author} - \`${message.author.id}\`**)** adlı yetkili **(**<@${kisi.id}> - \`${kisi.id}\`**)** üyesinin yasağını kaldırdı! \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `));

}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unban", "yasak-kaldır"],
  permLvl: 0,
}

  exports.help = {
  name: 'unban'
}