const Discord = require('discord.js');
module.exports = {
    name: "sil",
    aliases: ["sil", "clear"],
    run: async(client, message, args) => {
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp();

        if (!client.config.sil.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed2.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let adet = args[0];
        if (!adet) return message.channel.send("Lütfen kaç tane mesaj silineceğini yazınız! ( 1 - 99 )").then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        message.channel.bulkDelete(adet).then(() => {
            return message.channel.send(`**${adet}** adet mesaj sildim.`).then(x => x.delete({ timeout: 2000 })).then(message.react(client.config.tik));
        }).catch(err => {
            return message.channel.send("Beklenmedik bir arıza yaşandı lütfen bot sahibine haber verin!")
        })

    }
}
