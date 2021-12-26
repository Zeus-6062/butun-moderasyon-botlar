const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if(!message.member.roles.cache.has("818488108085149705") && !message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "⛔ Bu komutu kullanabilmek için `Emojileri yönet` yetkisine sahip olmalısınız"
    );
  let knavelink = args[0];
  let knaveisim = args[1];
  let guild = message.guild;
  if (!knavelink)
    return message.channel.send("Emojinin alınacağı linki girmelisin.");
  if (!knaveisim) return message.channel.send("Emojinin ismini belirlemedin");

  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Emoji Eklendi", message.guild.iconURL)
    .setDescription(` **${knaveisim} İsmiyle Yeni Bir Emoji Oluşturuldu.**`)
    .setFooter(`Komutu kullanan yetkili : ${message.author.username}`);

  guild
    .emojis.create(`${knavelink}`, `${knaveisim}`)
    .then(emoji => message.channel.send(embed));
  message.react("✅").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["addemoji", "emojioluştur", "ee"],
  permLevel: 0
};
exports.help = {
  name: "emojiekle",
  description: "Sunucuya emoji eklersiniz",
  usage: "emojiekle <link> <isim>"
};
