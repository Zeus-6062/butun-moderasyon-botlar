const { MessageEmbed } = require('discord.js')

exports.run = async function(client, message, args) {
const user = message.mentions.users.first()
if (user) {
    const embed = new MessageEmbed()
.setColor("2f3136")
.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
message.channel.send(embed)
} else {
    const embed = new MessageEmbed()
.setColor("2f3136")
.setImage(message.author.displayAvatarURL({ dynamic: true, size: 4096 }))
message.channel.send(embed)
}

}

exports.conf = {
    aliases:["av","pp"]
}

exports.help = {
    name:'avatar'
}