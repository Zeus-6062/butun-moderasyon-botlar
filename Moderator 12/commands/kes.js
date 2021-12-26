const Discord = require("discord.js");
module.exports = {
    name: "kes",
    aliases: ["bağlantıyı-kes", "kopar"],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!').setColor('2F3136').setTimestamp().setThumbnail(message.author.avatarURL);

        if (!client.config.transport.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!").setColor('2F3136').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setFooter('Ducky Was Here!')).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }

  let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!kullanıcı) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenemedi! \n `.kes @Ducky`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));


  let kullanıcıkanal = kullanıcı.voice.channel
  if(!kullanıcıkanal) return message.channel.send(embed.setDescription("Etiketlediğin kullanıcı herhangi bir ses kanalında değil!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));

  kullanıcı.voice.kick(args[0])
  message.channel.send(embed.setDescription(`<@${kullanıcı.id}> üyesi'nin bağlantısı kesildi!`)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));
    
  }
};
