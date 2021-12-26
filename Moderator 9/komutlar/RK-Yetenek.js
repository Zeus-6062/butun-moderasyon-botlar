const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (client, message, args) => {
        message.channel.send(new Discord.MessageEmbed().setDescription(`\

Öncelikle bir rol vermek istiyorsanız <@&${config.ability}> rolüne sahip olmalısınız!

------------------------------------------------------------

<@&${config.vocal}>  \`.vocal @RK/ID\`
<@&${config.designer}> \`.designer @RK/ID\`
<@&${config.sponsor}>   \`.sponsor @RK/ID\`
<@&${config.şair}>  \`.şair @RK/ID\`

`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
            .setAuthor('Rol Yardım Menüsü!')
            .setFooter('Kyle ❤️ Relly')
        ) 
    }
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["yetenek"],
        permLevel: 0,
      }
      
      exports.help = {
        name: "ytnk"
      };