const Discord = require('discord.js');

module.exports = {
    name: "toplutaşı",
    run: async(client, message, args) => {
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp();

        if (!client.config.toplutaşı.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed2.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let channel = args[0];
        if (!channel) return message.channel.send(embed2.setDescription("Kulanıcılar nereye taşınıcak?")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        message.channel.send(embed2.setDescription('Kullanıcılar taşınmaya başlandı')).then(message.react(client.config.tik));
        await message.guild.members.cache.forEach(async xx => {
            if (!xx.voice.channel) return;
            if (xx.voice.channel.id == channel) return;
            await xx.voice.setChannel(channel)

        })
        message.edit("Kullanıcı taşıma işlemi bitti!").then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
    }
}
