const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "kilit",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('2F3136').setThumbnail(message.author.avatarURL).setFooter('Ducky Was Here!');

        if (!client.config.kilithammer.some(id => message.member.roles.cache.has(id)) && (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(message.react(client.config.no));
        }
        if (db.get(`kilitli`)) {
            message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });
            message.channel.send(embed.setDescription("Kanal'a yazma izini açıldı!")).then(message.react(client.config.tik));
            db.delete(`kilitli`)
        } else {
            message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false });
            message.channel.send(embed.setDescription("Kanal'a yazma izini kapatıldı!")).then(message.react(client.config.tik));
            db.set(`kilitli`, true)
        }
    }
}
