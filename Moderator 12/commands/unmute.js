const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'unmute',
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Ducky Was Here!');

        if (!client.config.mutehammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.unmute @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        await message.guild.members.cache.get(member.id).roles.remove(client.config.muteRoles)

        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "mute-log")

        message.channel.send(embed.setDescription("Kullanıcının yazı kanallarındaki susturulması açıldı!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
        channel.send(embed.setDescription(`${message.author} adlı yetkili tarafından ${member} adlı kullanıcının susturulması kaldırıldı!`))
    }
}
