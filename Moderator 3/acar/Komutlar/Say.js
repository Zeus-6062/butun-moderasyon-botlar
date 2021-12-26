const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
module.exports = {
    Isim: "say",
    Komut: ["istatistik", "sesli"],
    Kullanim: "say",
    Aciklama: "Sunucunun bütün verilerini gösterir",
    Kategori: "Üye",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
  let ekipRolu = acar.ekipRolu || undefined;
  let erkekRolu = acar.erkekRol || undefined;
  let kizRolu = acar.kadinRol || undefined;
  let boosterRolu = acarveri.Roller.boosterRolu || undefined;
  const embed = new MessageEmbed().setColor("#2F3136").setAuthor(acarveri.sunucuIsmi, message.guild.iconURL({ dynamic: true })).setFooter(client.altbaslik).setAuthor(acarveri.Tag + " " + acarveri.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
  message.channel.send(embed.setDescription(`**${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.memberCount}\` kişi bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.members.cache.filter(u => u.presence.status != "offline").size}\` aktif kişi bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.members.cache.filter(u => u.user.username.includes(acarveri.Tag)).size}\` isim taglı üye bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuz da \`${message.guild.members.cache.filter(u => u.user.discriminator.includes(acarveri.Tag2)).size}\` etiket taglı üye bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Sunucumuzda \`${message.guild.roles.cache.get(boosterRolu).members.size}\` booster bulunmakta.
${client.emojis.cache.get(acarveri.Emojiler.tag)} Ses kanallarında \`${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}\` kişi bulunmakta.**`)).then(x => x.delete({timeout:10000})); 
    }
};
