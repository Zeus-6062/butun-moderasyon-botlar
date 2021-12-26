const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "katıldı",
    aliases: ["toplantı"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL);

        if (!client.config.katıldıhammer.some(id => message.member.roles.cache.has(id)) && (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!")).then(message.react(client.config.no));
        }

        let members = message.guild.members.cache.filter(member => member.roles.cache.has(client.config.katıldı) && member.voice.channelID != client.config.toplantikanal);


        if (!message.member.voice.channelID) 
        return message.reply(embed.setDescription("Yoklama alabilmek için bir ses kanalında olmalısın!")).then(message.react(client.config.no));

        members.array().forEach((member, index) => {setTimeout(() => {member.roles.remove(client.config.katıldı).catch();}, index * 1250)});
        let verildi = message.member.voice.channel.members.filter(member => !member.roles.cache.has(client.config.katıldı) && !member.user.bot)
        verildi.array().forEach((member, index) => {setTimeout(() => {member.roles.add(client.config.katıldı).catch();}, index * 1250)});
        message.channel.send(embed.setDescription(`<@&${client.config.katıldı}> Rolü Dağıtılmaya Başladı.\n\n <:ancalagon_tik:817876526292664331> Toplam Rol Verilen Kullanıcı: \`${verildi.size}\` \n\n <:ancalagon_carpi:817876526590197801> Rolleri Geri Alınan Kullanıcı Sayısı: \`${members.size}\``).setColor('2F3136').setThumbnail(message.guild.iconURL({dynamic:true}))).then(message.react(client.config.tik));}
    }