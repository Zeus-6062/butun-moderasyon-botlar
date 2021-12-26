const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "kilit",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Developed by Antiperes');

        if (!client.config.üstYönetim.some(id => message.member.roles.cache.has(id)) && (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
        }
        if (db.get(`kilitli`)) {
            message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });
            message.channel.send("kanal kiliti açıldı.")
            db.delete(`kilitli`)
        } else {
            message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false });
            message.channel.send("kanal kilitlendi.")
            db.set(`kilitli`, true)
        }
    }
}
