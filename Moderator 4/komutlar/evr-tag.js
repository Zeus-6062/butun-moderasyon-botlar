
const Discord = require('discord.js');
const conf = require('../ayarlar.json');
exports.run = async(client, message, args) => {
 
message.reply(`Tagımız : \`${conf.taG}\``).then(m => m.delete({ timeout: 12000 }))

}
exports.conf = {
    aliases : []
}
exports.help = {
name : 'tag',
description:"Sunucunun tagını gösterir."
}

