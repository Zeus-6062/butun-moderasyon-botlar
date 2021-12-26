const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "forcegit",
    aliases: ["fgit"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136');

        if (!client.config.transport.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

        if (!message.member.voice.channel) return message.channel.send(embed.setDescription("Kullanıcı'yı yanına çekebilmek için sesli kanalda olman gerekiyor!")).then(message.react(client.config.no));
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.fgit @Ducky`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (!member.voice.channel) return message.channel.send(embed.setDescription("Etiketlediğin kullanıcı herhangi bir ses kanalında bulunmuyor!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        message.member.voice.setChannel(member.voice.channel.id)
        return message.channel.send(embed.setDescription(`${member} adlı kullanıcının bulunduğu odaya gidildi!`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));

    }
}
