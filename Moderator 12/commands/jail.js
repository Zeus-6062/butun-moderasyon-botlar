const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');
require("moment-duration-format");
const db = require('quick.db');

module.exports = {
    name: "jail",
    aliases: ["yargı", "mahkum"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL);

        if (!client.config.jailhammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }  

        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "jail-log")

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        moment.locale('tr')
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.jail @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let reason = args.slice(2).join(' ');
        if (!reason || reason.split('.').join('').length < 2) return message.channel.send(embed.setDescription("Kullanıcıyı cezalı'ya atmak için bir neden ve süre yazınız! \n `.jail @Ducky/ID 5m Küfür`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        let time = args[1]
        let jailzaman = ms(`${time}`)
        let ölç = db.get(`olçmebaşlat_${message.author.id}`) || [];
        if (ölç.filter(data => (Date.now() - data.time) < 60000).length >= 10) {
            message.delete();
            message.member.roles.set(client.config.jailRoles)
            let jaildekiler = db.get(`jaildekimallar_${message.author.id}`) || [];
            return jaildekiler.forEach(x => {
                message.guild.members.cache.get(x.id).roles.set(x.roller.map(s => s.id));
            })
        }
        db.push(`${member.id}_sicil`, `\`[JAIL]\` ${message.author} tarafından **${reason}**  sebebiyle **${moment().format('LLL')}** tarihinde **${time}** süresince **cezalıya atıldı!**.`)
        member.roles.set(client.config.jailRoles)
        message.channel.send(embed.setDescription(`${member} Adlı Kullanıcı **${reason}** Sebebi ile **${time}** süresince cezalıya atıldı!`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
        db.add(`${message.author.id}_jail`, 1)
        db.set(`xxhub_${member.id}`, member.roles.cache.map(s => s))
        db.push(`jaildekimallar_${message.author.id}`, { id: member.id, roller: member.roles.cache.map(s => s) })
        db.push(`olçmebaşlat_${message.author.id}`, { time: Date.now() });
        channel.send(embed.setTitle('Kullanıcı Cezalıya Atıldı!').setDescription(`Yetkili: ${message.author} - (\`${message.author.id}\`) \n Jaile Atılan: ${member} - \`${member.id}\` \n Sebep: ${reason} \n Süre: ${time} \n Tarih: **${moment().format('LLL')}**`))
        if (time) setTimeout(() => {
            member.roles.set(db.get(`xxhub_${member.id}`).map(s => s.id))
            channel.send(embed.setTitle('Kullanıcı Tahliye Oldu!').setDescription(`${member} Adlı Kullanıcının jaili açıldı!`))
        }, jailzaman)
    }
}
