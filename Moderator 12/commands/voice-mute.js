const moment = require('moment');
const ms = require('ms');
const Discord = require('discord.js');
require("moment-duration-format");
const db = require('quick.db');

module.exports = {
    name: "voice-mute",
    aliases: ["vmute"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL);

        if (!client.config.voicemutehammer.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }  

        let channel = client.guilds.cache.get(client.config.guildID).channels.cache.find(c => c.name === "voice-mute-log")

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        moment.locale('tr')
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.voice-mute @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let reason = args.slice(2).join(' ');
        if (!reason || reason.split('.').join('').length < 2) return message.channel.send(embed.setDescription("Kullanıcıyı susturmak için bir neden ve süre yazınız! \n `.voice-mute @Ducky/ID 5m Küfür`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        let time = args[1]
        let mutezaman = ms(`${time}`)

        db.push(`${member.id}_sicil`, `\`[VOICE MUTE]\` ${message.author} tarafından **${reason}**  sebebiyle **${moment().format('LLL')}** tarihinde **${time}** süresince **__ses__** kanallarında susturuldu. `)
        db.add(`${message.author.id}_sesmute`, 1)
        member.roles.add(client.config.voicemuteRoles)
        member.voice.kick();
        message.channel.send(embed.setDescription(`${member} adlı kullanıcı **ses** kanallarında **${reason}** sebebiyle **${time}** süresince susturuldu`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik)).then(() => {
            channel.send(embed.setTitle('Kullanıcı Susturuldu!').setDescription(`Yetkili: ${message.author} - (\`${message.author.id}\`) \n Susturulan: ${member} - \`${member.id}\` \n Sebep: ${reason} \n Süre: ${time} \n Tip: Ses Kanalları \n Tarih: **${moment().format('LLL')}**`))
            if (time) setTimeout(() => {
                member.roles.remove(client.config.voicemuteRoles)
                channel.send(embed.setTitle('Kullanıcı Susturması Açıldı!').setDescription(`${member} Adlı Kullanıcının ses mutesi açıldı!`))
            }, mutezaman)
        })
    }
    }
