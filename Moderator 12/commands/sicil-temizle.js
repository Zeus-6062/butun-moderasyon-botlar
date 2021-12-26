const db = require('quick.db');

module.exports = {
    name: "sicil-temizle",
    run: async(client, message, args) => {
        //if(message.guild.ownerID !== message.author.id) return;
        if (!client.config.siciltemizle.some(id => message.member.roles.cache.has(id))&& (!message.member.hasPermission("ADMINISTRATOR"))) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription('Komutu kullanan kullanıcıda yetki bulunmamakta!').setColor('#2F3136').setTimestamp().setThumbnail(message.author.avatarURL)).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        let member = message.mentions.members.first();
        if (!member) return message.channel.send(new Discord.MessageEmbed()("Kullanıcı bulunamadı veya etiketlenemedi! \n `.sicil-temizle @Ducky/ID`")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));

        db.delete(`${member.id}_sicil`)
        message.channel.send("Kullanıcının Tüm Sicileri Silindi!").then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.tik));

    }
}
