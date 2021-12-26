const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "sicil",
    run: async(client, message, args) => {
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp();

        if (!client.config.mutehammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed2.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed2.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.sicil @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (!db.get(`${member.id}_sicil`)) return message.channel.send(embed2.setDescription("Kullanıcı daha önce hiç ceza almamış!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        var sicil = db.get(`${member.id}_sicil`).map((data, index) => `\`${index+1}.\` ${data}`).join("\n")
        const embed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setAuthor(message.member.displayName, message.guild.iconURL({ dynamic: true }))
            .setDescription(`${member} Adlı kullanıcının sicili:\n\n ${sicil}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        return message.channel.send(embed).then(message.react(client.config.tik));
    }
}