const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
const acar = client.veri
module.exports = {
    Isim: "temizle",
    Komut: ["sil"],
    Kullanim: "sil <1-100>",
    Aciklama: "Belirlenen miktar kadar metin kanallarında ki metinleri temizler.",
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
  onRequest: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Hata: Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!").then(x => x.delete({timeout: 5000}));
    if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send("Hata: 1-100 arasında silinecek mesaj miktarı belirtmelisin!").then(x => x.delete({timeout: 5000}));
    await message.delete().catch();
    message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(`${client.emoji(acar.Emojiler.Onay)} Başarıyla <#${message.channel.id}> (\`${message.channel.id}\`) adlı kanal da (**${msjlar.size}**) adet mesaj silindi!`).then(x => x.delete({timeout: 5000}))).catch()
  
  }
};