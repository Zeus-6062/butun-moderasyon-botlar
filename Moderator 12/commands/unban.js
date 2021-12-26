const ms = require('ms');
const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "unban",
    run: async(client, message, args) => {
        if (!client.config.banhammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL);
        let member = args[0];
        const banList = await message.guild.fetchBans();
        if (!member || isNaN(member) || !banList.has(member)) {
            return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.unban ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        message.guild.members.unban(member);
        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "ban-log")
        message.channel.send(embed.setDescription(`<@!${member}> adlı kullanıcının banı açıldı!`))
        channel.send(embed.setDescription(`${message.author} adlı yetkili tarafından <@${member}> adlı kullanıcının banını kaldırıldı!`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
    }
}
