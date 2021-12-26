const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

if(!["830411284646330388"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).then(x => x.delete({timeout: 5000}));

  let fadness = "\`>\` **Sesli Kanalda Olmayan Yetkililer:**\n";
  message.guild.roles.cache.get("830714455980638209").members.map(r => {
    fadness += !r.voice.channel ? "\`>\`  <@" + r.user.id + ">\n" : "";
  });

  message.channel.send(fadness + "").then(s => s.s);
};
module.exports.conf = {
  aliases: ["sesli","sesteki-yetkililer"]
};

module.exports.help = {
  name: "sesyt"
};