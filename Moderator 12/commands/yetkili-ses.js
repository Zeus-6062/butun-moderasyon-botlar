const  Discord = require("discord.js");
module.exports = {
    name: "yetkilises",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Ducky Was Here!');
        if (!client.config.yetkilises.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has('814601804167118862')).filter(s => !s.voice.channel).map(s => s).join(' ')
        message.channel.send(`\`\`\`js\n SESTE OLMAYAN YETKİLİLER \`\`\` \n ${sesteolmayan}`).then(message.react(client.config.tik));

    }
}
