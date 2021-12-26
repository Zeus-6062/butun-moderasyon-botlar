const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
module.exports = {
    Isim: "vip",
    Komut: ["vıp"],
    Kullanim: "vip @acar/ID",
    Aciklama: "Etiketlenen kişiye VIP rolü verir.",
    Kategori: "Yetkili Komutları",
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
    var rolismi = "VIP"
    var rolid = acarveri.Roller.vipRolu
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!acarveri.Roller.botCommand.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('MANAGE_ROLES') && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(x => x.delete({timeout: 5000}));
     if (!uye) return message.channel.send(`Hata: ${rolismi} rolü verebilmem için lütfen bir üyeyi etiketle __Örn:__ \`${client.sistem.a_Prefix}${module.exports.Isim} @Antiperes/ID\`!`).then(x => x.delete({timeout: 5000}));
      uye.roles.cache.has(rolid) ? uye.roles.remove(rolid) : uye.roles.add(rolid);
      if(!uye.roles.cache.has(rolid)) {
        message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)} Başarıyla ${uye}, isimli kişiye **${rolismi}** rolü verildi.`).catch().then(x => x.delete({timeout: 7000}));
        message.react(client.emoji(acarveri.Emojiler.Onay))
      } else {
        message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)} Başarıyla ${uye}, isimli kişinin **${rolismi}** rolü geri alındı.`).catch().then(x => x.delete({timeout: 7000}));
        message.react(client.emoji(acarveri.Emojiler.Onay))
      };
    }
};
