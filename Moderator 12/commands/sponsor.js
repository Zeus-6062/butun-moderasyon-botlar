const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'sponsor',
    aliases: ['sıponsor'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Ducky Was Here!');

        if (!client.config.king.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Lütfen bir kullanıcı etiketleyip tekrar deneyiniz.\n `.sponsor @Ducky/ID`")).then(message.react(client.config.no));

        await message.guild.members.cache.get(member.id).roles.add(client.config.sponsor).then(message.react(client.config.tik));
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı'ya **SPONSOR** rolü verildi!`)
  
        )
    }
}
