const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args, member, client, level) => {
          if (!message.member.roles.cache.has("830411290895056898"))
            return message.channel.send(
              "Bu Komudu Kullanmaya İznin Yok"
            );
  let user =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.cache.get(args[0]);
  if (!user)
    return message.reply("Vereceğin kişiyi etiketlemen lazım.");
  user.roles.add("830411322491273227");
  const ky = new Discord.MessageEmbed().setDescription(
    `${user} Kullanıcısına Vip Olarak Aldım`
  );

//RK Tarafından Kodlandırılmıştır.

  message.channel.send(ky);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["vip"],
  permLevel: 0
};
exports.help = {
  name: "vip",
  description: "vip ver",
  usage: "vip ver"
};