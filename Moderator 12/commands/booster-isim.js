const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'zengin',
    aliases: ['b', 'booster'],
    run: async(client, message, args) => {
        let isim = args.slice(0).join(' ');
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136');

        if (!client.config.booster.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }  
        if(!isim) return message.channel.send(new Discord.MessageEmbed().setTimestamp().setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`Bir isim belirtmelisiniz. \n \`.zengin duckynin sol billuru\` `))
         
         
        message.guild.members.cache.get(message.author.id).setNickname(`${message.author.username.includes((client.config.tag)) ? (client.config.tag) : (client.config.tag2)} ${isim}`)
        return message.channel.send(new Discord.MessageEmbed().setDescription(`<@${message.author.id}> Kullanıcı adın ${isim} olarak değistirildi.`).setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000})).then(message.react(client.config.tik));;
         

        
    }
}