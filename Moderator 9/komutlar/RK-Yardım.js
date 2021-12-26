const Discord = require('discord.js')
const config = require("../config.js");
exports.run = async (client, message, args) => {
        message.channel.send(new Discord.MessageEmbed().setDescription(`\
.afk [sebep]
.avatar \`@RK/ID\`
.ban \`@RK/ID\` [sebep]
.ban-bilgi \`@RK/ID\`
.family
.join
.dashboard
.ekip
.kayıtsız\`@RK/ID\`
.0092 \`@RK/ID\`
.isim \`@RK/ID\`
.jail \`@RK/ID\` [süre] [sebep]
.mute \`@RK/ID\` [süre] [sebep]
.voice-mute \`@RK/ID\` [süre] [sebep]
.unjail \`@RK/ID\`
.unmute \`@RK/ID\`
.unban \`@RK/ID\`
.kes \`@RK/ID\`
.ekip/ekle/sil/bilgi \`@RK/ID\`
.voice-unmute \`@RK/ID\`
.çek \`@RK/ID\`
.git \`@RK/ID\`
.kes \`@RK/ID\`
.kb \`@RK/ID\`
.fgit \`@RK/ID\`
.fçek \`@RK/ID\`
.ses-kontrol \`@RK/ID\`
.sicil-temizle \`@RK/ID\`
.sicil \`@RK/ID\`
.erkek \`@RK/ID\`
.kız   \`@RK/ID\`
.isimler \`@RK/ID\`
.cihaz \`@RK/ID\`
.uyarı ekle/sil/bilgi \`@RK/ID\`
.rolbilgi \`@Rol-Adı\` 
.spotyengel \`aç/kapat\` 
.rolinfo \`@Rol-Adı\`
.rolver \`@RK/İD\`
.rollog \`@Rol-Adı\`
.zengin [isim]
.say
.ses
.sil
.snipe
.toplutaşı
.yetkilises
.tagaldı \`@RK/İD\`
.tagliste \`@RK/İD\`
-----------------------

.vocal \`@RK/ID\`
.designer \`@RK/ID\`
.sponsor \`@RK/ID\`
.şair \`@RK/ID\`

`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
            .setFooter('RK was here ?')

            
        )
    }
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["yardım"],
        permLevel: 0,
      }
      
      exports.help = {
        name: "yardım"
      };