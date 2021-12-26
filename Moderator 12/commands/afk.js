const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: "afk",
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setColor('#2F3136')
        let sebeb = args.slice(0).join(' ')
        let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
        if (link.test(sebeb)) {
            return message.channel.send(embed.setDescription("Afk sebebine link giremezsin!")).then(x => x.delete({ timeout: 5000 })).then(message.react(client.config.no));
        }
        if (!sebeb) return message.channel.send(embed.setDescription("`AFK moduna girmek için sebep belirtmen gerekiyor!`")).then(x => x.delete({ timeout: 3000 })).then(message.react(client.config.no));
        message.channel.send("`Başarılı Bir Şekilde AFK Moduna Girdin! Herhangi bir birşey yazana kadar afk sayılıcaksın!`").then(x => x.delete({ timeout: 3000 })).then(message.react(client.config.tik));
        db.set(`${message.author.id}_sebeb`, sebeb);
        db.set(`${message.author.id}_afktime`, Date.now())
    }
}