const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
const acar = client.veri
module.exports = {
    Isim: "seskontrol",
    Komut: ["sesk"],
    Kullanim: "seskontrol @acar/ID",
    Aciklama: "Belirlenen üyenin seste aktif veya haporleri ve kulaklığının açık veya kapalı olduğunu gösterir.",
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
    if(!acar.Roller.istatistikciRolleri) return message.channel.send(`Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.`).then(x => x.delete({timeout: 5000}));
    if(!acar.Roller.istatistikciRolleri.some(rol => message.member.roles.cache.has(rol)) &&!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Hata: Bu komutu kullanmak için yeterli izne sahip değilsin!`).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}seskontrol @Antiperes/ID\``).then(x => x.delete({timeout: 5000}));
    if(!uye.voice.channel) return message.channel.send(`Bilgi: ${uye}, (\`${uye.id}\`) bir ses kanalında aktif değil.`).then(x => x.delete({timeout: 5000}));
    let selfM = uye.voice.selfMute ? "kapalı" : "açık";
    let selfD = uye.voice.selfDeaf ? "kapalı" : "açık";
    message.channel.send(`${client.emoji(acar.Emojiler.tag)} ${uye}, (\`${uye.id}\`) adlı kullanıcı şu anda \`${message.guild.channels.cache.get(uye.voice.channelID).name}\` adlı ses kanalında ayrıca mikrofonu **${selfM}**, kulaklığı **${selfD}**.`).then(x => x.delete({timeout: 15000}));;
    
  }
};