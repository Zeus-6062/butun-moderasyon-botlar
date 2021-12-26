const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const db = require('quick.db');
exports.run = async (client, message, args) => {
  
let embed = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("**5 Saniye Bekleyiniz**")
.setFooter("Relly Ping Sistemi")
.setTimestamp()
await message.channel.send(embed).then(x =>{
setTimeout(function(){
let yeniembed = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription('Anlık ping durumu: **' + client.ws.ping + 'ms**') 
.setFooter("Relly Ping Sistemi")
.setTimestamp()
x.edit(yeniembed)
},5000)
});
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
};