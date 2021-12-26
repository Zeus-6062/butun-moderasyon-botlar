const Discord = require('discord.js')
module.exports = {
    name: "help",
    aliases: ["yardım"],
    run: async(client, message, args) => {
        message.channel.send(new Discord.MessageEmbed().setDescription(`\
.afk [sebep]
.ban \`@Ducky/ID\` [sebep]
.jail \`@Ducky/ID\` [süre] [sebep]
.mute \`@Ducky/ID\` [süre] [sebep]
.voice-mute \`@Ducky/ID\` [süre] [sebep]
.unjail \`@Ducky/ID\`
.unmute \`@Ducky/ID\`
.unban \`ID\`
.uyar \`@Ducky/ID\`
.uyarılar \`@Ducky/ID\`
.uyarı-temizle \`@Ducky/ID\`
.voice-unmute \`@Ducky/ID\`
.çek \`@Ducky/ID\`
.git \`@Ducky/ID\`
.kes \`@Ducky/ID\`
.fçek \`@Ducky/ID\`
.fgit \`@Ducky/ID\`
.ses-kontrol \`@Ducky/ID\`
.sicil-temizle \`@Ducky/ID\`
.sicil \`@Ducky/ID\` 
.spotify \`@Ducky/ID\`
.rolinfo \`@Rol-Adı\`
.zengin [isim]
.katıldı
.kilit
.say
.ses
.sil
.snipe
.toplu-sicil-temizle 
.toplu-uyarı-temizle
.toplutaşı
.yetkilises
.yetkiver 

-----------------------

.yetenek

`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
        )
    }
}