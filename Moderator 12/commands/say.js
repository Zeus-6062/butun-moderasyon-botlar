const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {


        if (!client.config.register.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new MessageEmbed().setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!").setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

        const mapping = {
            " ": "",
            "0": "<a:ducky_0:817870765080838155>", // sayı iDleri
            "1": "<a:ducky_1:817870765209813034>",
            "2": "<a:ducky_2:817870765365526588>",
            "3": "<a:ducky_3:817870765160136785>",
            "4": "<a:ducky_4:817870765382303794>",
            "5": "<a:ducky_5:817870765327122504>",
            "6": "<a:ducky_6:817870765499482142>",
            "7": "<a:ducky_7:817870765470253116>",
            "8": "<a:ducky_8:817870765491093555>",
            "9": "<a:ducky_9:817870765189365781>",
        };
        var tag = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(client.config.tag)).size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var boost = message.guild.premiumSubscriptionCount
        var duckytoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var duckytag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var duckyses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var duckyonline = `${online}`.split("").map(c => mapping[c] || c).join("")
        var duckyboost = `${boost}`.split("").map(c => mapping[c] || c).join("")
        
        const embed = new MessageEmbed()
            .setDescription(`• Sunucuda toplam **${duckytoplamüye}** üye bulunmakta.
            • Sunucuda aktif **${duckyonline}** üye bulunmakta.
            • Sunucuda tagımızı alan **${duckytag}** üye bulunmakta.
            • Sunucuda sesli sohbetlerde  **${duckyses}** üye bulunmakta.
            • Sunucumuzda toplam **${duckyboost}** boost bulunmakta.`)
            .setColor('2F3136')
        message.channel.send(embed).then(message.react(client.config.tik));
    }
}