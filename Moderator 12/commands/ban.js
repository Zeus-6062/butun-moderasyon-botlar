const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ["katliam", "yasakla"],
    run: async(client, message, args) => {

        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setFooter('Ducky Was Here!').setTimestamp()
        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "ban-log") //log kanalının ismi


        if (!client.config.banhammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }   
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let moment = require('moment')
        moment.locale('tr')
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.ban @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(embed.setDescription("Kullanıcıyı yasaklamak için bir neden yazınız! \n `.ban @Ducky/ID Reklam Spamladı.`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı, ${message.author} tarafından **${reason}** sebebiyle sunucudan yasaklandı!`).setImage('https://cdn.discordapp.com/attachments/802298395812429855/806503448240979978/c4f00aa36d3d7bab31cd33be36236f25fb2fcbb6_hq.gif')).then(x => x.delete({ timeout: 3000 })).then(message.react(client.config.tik));
        channel.send(embed.setTitle('Kullanıcı Yasaklandı').setDescription(`Yetkili: ${message.author} - (\`${message.author.id}\`) \n Banlanan: ${member} - \`${member.id}\` \n Sebep: ${reason}`))
        member.send(embed.setDescription(`**${member.guild.name}** sunucusundan **${reason}** sebebi ile  ${message.author} tarafından **yasaklandın!**`))
        db.delete(`kayıt_${member.id}`)
        message.guild.members.ban(member.id, { reason: `Yetkili: ${message.author.id} || Sebep: ${reason} ` })
        db.add(`${message.author.id}_ban`, 1)
        db.push(`${member.id}_sicil`, `\`[BAN]\` ${message.author} tarafından **${reason}**  sebebiyle **${moment().format('LLL')}** tarihinde sunucudan **banlandı**.`)
        db.push(`${message.author.id}_banlıüyelers`, { id: member.id })
    }
}
