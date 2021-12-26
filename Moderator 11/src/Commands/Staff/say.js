const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")

module.exports = {
  conf: {
    aliases: ["say","count"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

    message.channel.send(embed.setDescription(`
\`•\` Seste toplam **${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}** kullanıcı var.
\`•\` Tagımızı almış **${message.guild.members.cache.filter(m => m.user.username.includes(conf.Tag)).size}** kişi var.
\`•\` Sunucumuzda toplam  **${message.guild.memberCount}** üye var.
\`•\` Sunucumuza toplam **${message.guild.premiumSubscriptionCount}** takviye yapılmış.
\`•\` Sunucuda toplam **${message.guild.members.cache.filter(u => u.presence.status != "offline").size}** çevrimiçi üye var.
  `))
}}