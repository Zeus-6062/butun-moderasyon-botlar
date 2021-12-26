const Discord = require('discord.js')

exports.run = async (client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Merhaba ben RK');
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor.")).then(x => x.delete({ timeout: 3000 }))
        }
        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has('YETKİLİROLİD')).filter(s => !s.voice.channel).map(s => s).join('\n')
        message.channel.send(`${sesteolmayan} \n \`\`\`Merhabalar sunucumuzun ses aktifliğini arttırmak için lütfen müsait isen public odalara değil isen afk odasına geçer misin?\`\`\``)
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ysay"],
    permLevel: 0
};
exports.help = {
    name: "ysay",
    description: "Belirtilen Etikette Kaç Kişi Olduğunu Gösterir",
};