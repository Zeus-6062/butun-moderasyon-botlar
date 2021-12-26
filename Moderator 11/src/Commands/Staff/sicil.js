const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")
const penals = require("../../Schemas/penals");
const moment = require("moment");
moment.locale("tr");
module.exports = {
  conf: {
    aliases: ["sicil"],
    name: "sicil",
    help: "sicil <Kullanıcı>"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let data = await penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
    if (data.length === 0) return message.channel.send(`${member.toString()} üyesinin sicili temiz!`)
    data = data.map((x) => `
    Ceza ID: \`#${x.id}\` 
    Durum : **${x.active ? "Devam Eden Ceza" : "Bitmiş Ceza"}** 
    Ceza Türü: \`[${x.type}]\`
    Yetkili: <@${x.staff}>
    Sebep: \`${x.reason}\`
    Tarih: \`${moment(x.date).format("LLL")}\`
    Aldığı Ceza: \`${x.type.toLowerCase().replace("-", " ")}\``).join("\n**────────────**\n");

    for (var i = 0; i < Math.floor(data.length / 2000); i++) {
      message.channel.send(embed.setDescription(data.slice(0, 2000)));
      data = data.slice(2000);
    }
    if (data.length > 0) message.channel.send(embed.setDescription(data));
  },
};