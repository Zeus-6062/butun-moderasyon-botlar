const Discord = require("discord.js")
const moment = require("moment")
module.exports = {
    name: 'seskontrol',
    aliases: ['n'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#2F3136').setTimestamp();

        if (!client.config.transport.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!").setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
    let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!üye) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.seskontrol @Ducky`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
  
    let üyekanal = üye.voice.channel
    if(!üyekanal) return message.channel.send(embed.setDescription("Etiketlediğin kullanıcı herhangi bir ses kanalında değil!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
 
    let kanal = üye.voice.channel
    
     let mik = üye.voice.selfMute ? "Kapalı Durumda <:ducky_offvoice:817889232676847647>" : "Açık Durumda <:ducky_onvoice:817889232822861864>";
 let kulaklık = üye.voice.selfDeaf ? "Kapalı Durumda <:ducky_offdeaf:817889232956686396>" : "Açık Durumda <:ducky_ondeaf:817889232550101003>";
let stable;
if(üye.voice.channel === null || üye.voice.channel.id === undefined || üye.voice.channel === undefined) stable = `None!`
    
    message.channel.send(embed.setDescription(`${üye} üyesinin bulunduğu ses kanalı - <#${kanal.id}> \n Mikrofonu **${mik}** \n Kulaklığı **${kulaklık}**`)).then(x => x.delete({ timeout: 30000 })).then(message.react(client.config.tik));
    }

};

