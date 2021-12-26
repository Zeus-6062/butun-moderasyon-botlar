const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if (
    !["830714455980638209"].some(role =>
      message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message
      .reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)
      .then(x => x.delete({ timeout: 8000 }));

  let member = message.mentions.members.first();
  let yaş = args[2];
  let isim = args[1];

  if (!member)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Kişiyi Etiketlemelisin!")
    );

  if (!isim)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription("Kişinin İsmini Yazmalısın")
    );

  // member.setNickname(` ${isim} | ${yaş}`);

  member.setNickname(`★ ${isim} | ${yaş}`);
  return message.channel.send(
    new Discord.MessageEmbed()
      .setColor("GREEN")
      .addField(
        "Başarılı!",
        ` \`>\` Kullanıcının İsmi Başarıyla **★ ${isim} | ${yaş}** Olarak Değiştirildi`
      )
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isimdegistir", "i"],
  permLevel: 0
};

exports.help = {
  name: "isim",
  description: "Belirttiğiniz kullanıcının kullanıcı adını değiştirir.",
  usage: "isim @kullanıcı <kullanıcı adı>"
};