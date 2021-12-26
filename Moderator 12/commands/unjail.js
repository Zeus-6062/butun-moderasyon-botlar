const ms = require('ms');
const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "unjail",
    run: async(client, message, args) => {
        if (!client.config.jailhammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setColor('2F3136').setFooter('Ducky Was Here!');
        let member = message.mentions.members.first();
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi! \n `.unjail @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (!db.get(`xxhub_${member.id}`)) return message.channel.send(embed.setDescription("Etiketlediğin kullanıcı cezalıda değil!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        member.roles.set(db.get(`xxhub_${member.id}`).map(s => s.id)) //db.get(`xxhub_${member.id}`).map(s => s.id)

        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "jail-log")

        message.channel.send(embed.setDescription(`${member} adlı kullanıcı jailden çıkartıldı.`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
        channel.send(embed.setDescription(`${message.author} adlı yetkili tarafından ${member} adlı kullanıcının jaili kaldırıldı!`))
    }
}
