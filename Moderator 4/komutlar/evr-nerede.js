const { MessageEmbed } = require('discord.js');
const config = require('../ayarlar.json');
var prefix = config.prefix;
exports.run = async (client , message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmelisin.`)).then(x => x.delete({ timeout: 5000 }));
    let kanal = member.voice.channel
    if(!kanal) return message.channel.send(embed.setDescription(`Belirttiğin kişi ses kanalında bulunmuyor.`)).then(x => x.delete({ timeout: 5000 }));
let microphone = member.voice.selfMute ? "kapalı" : "açık";
let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join(", ")

kanal.createInvite().then(invite =>
message.channel.send(embed.setDescription(`${member} kullanıcısı \`${kanal.name}\` kanalında.
**Mikrofon durumu:** \`${microphone}\`
**Kulaklık durumu:** \`${headphones}\`

[kanal](https://discord.gg/${invite.code})

\` > \` Odadaki kişiler; ${sestekiler}`)))
message.react(config.tik)
}



exports.conf = { enabled: true, guildOnly: false, aliases: ['nerede','nere',] };

exports.help = { name: 'nerede' }; 