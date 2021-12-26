const conf = require("../../Configs/config.json")
module.exports = {
  conf: {
    aliases: ["kilit","lock"],
    name: "kilit",
    help: "kilit"
  },

  run: async (client, message, args, embed) => {
    if(![conf.Staff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
    //return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.Staff).name}\` yetkisine sahip olman lazım`))

    if (message.channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) {
      message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
      message.channel.send(embed.setDescription("Kanal kilitlendi!"));
    } else {
      message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: null,
      });
      message.channel.send(embed.setDescription("Kanal kilidi açıldı!"));
    }
  },
};
