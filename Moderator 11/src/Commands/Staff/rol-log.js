const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const roles = require("../../Schemas/rol-log")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["rol-log","rolbilgi"],
    name: "rollog",
    help: "rollog [Kullanıcı]"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) { return message.channel.send("Bir kullanıcı belirtmelisin!") }

    let data = await roles.findOne({ guildID: message.guild.id, userID: member.user.id});
    if (!data) { return message.channel.send(embed.setDescription(`${member} üyesinin rol geçmişi bulunmuyor!`)) }

    data = data.roles.sort((a, b) => b.date - a.date).map((x) => 
    `${x.type ? emoji.TikID + " Rol verildi" : emoji.CarpiID + " Rol alındı"}. Rol: <@&${x.role}> Yetkili: <@${x.staff}> 
    Tarih: \`${moment(x.date).format("LLL")}\` \`(${moment(x.date).fromNow()})\``).join("\n**────────────────────────**\n");
    for (var i = 0; i < Math.floor(data.length / 2000); i++) {
      message.channel.send(embed.setDescription(data.slice(0, 2000)));
      data = data.slice(2000);
    }
    message.react(emoji.TikID)
    if (data.length > 0) message.channel.send(embed.setDescription(data));
  },
};