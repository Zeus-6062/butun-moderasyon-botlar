const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');
require("moment-duration-format");
const db = require('quick.db');


module.exports = {
    name: "uyar",
    run: async(client, message, args) => {
        if (!client.config.uyarhammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "uyarı-log")
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('2F3136').setTimestamp();
        let member = message.mentions.members.first();
        moment.locale('tr')
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi! \n `.uyar @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        let reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(embed.setDescription("Kullanıcıyı neden uyarmak istiyorsunuz! \n `.uyar @Ducky/ID Spam yaptı`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        db.push(`${member.id}_uyarılar`, `\`[UYARI]\` ${message.member} tarafından **${moment().format('LLL')}** tarhinde **${reason}** sebebi ile uyarı aldı`)
        db.add(`xxuyarı_${member.id}`, 1)
        let uyarı = db.get(`xxuyarı_${member.id}`)
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı ${message.member} adlı yetkili tarafından **${reason}** sebebiyle uyarıldı!`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
        if (uyarı > 2) {
            channel.send(embed.setDescription(`${member} Adlı Kullanıcı **3** Uyarı Limitini Aştığı İçin 30 dakika Susturuldu.`))
            member.roles.add(client.config.muteRoles)
            setTimeout(() => {
                member.roles.remove(client.config.muteRoles)
            }, 1800000)
        }
    }
}
