const Discord = require('discord.js')
module.exports = {
    name: "yetenek",
    aliases: ["Yetenek"],
    run: async(client, message, args) => {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Rol Yardım Menüsü!')
        .setDescription(`\ Öncelikle bir rol vermek istiyorsanız <@&814601804167118863> rolüne sahip olmalısınız. Bu komut sayesinde aşağıdaki rolleri kullanıcılara verebilirsiniz!

        ——————————————————————————————

<@&814601804158468107>: \`.vocal @Ducky/ID\`

<@&814601804158468108>: \`.şair @Ducky/ID\`

<@&814601804158468106>: \`.designer @Ducky/ID\`

<@&814601804158468110>: \`.sponsor @Ducky/ID\`

<@&814601804158468109>: \`.streamer @Ducky/ID\`


`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
        )
    }
}