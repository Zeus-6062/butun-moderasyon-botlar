const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
const ms = require('ms');
module.exports = {
    Isim: "jail",
    Komut: ["tempjail","cezalı"],
    Kullanim: "cezalı @acar/ID <süre> <sebep>",
    Aciklama: "Belirlenen üyeyi belirtilen süre boyunca cezalıya atar.",
    Kategori: "Yetkili",
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
    let jailicon = client.emojis.cache.get(acar.Emojiler.jailatildi)
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
    if(!acar.Roller.jailHammer || !acar.Roller.jailHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!acar.Roller.jailHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}jail @Antiperes/ID <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let jaildekiler = cezaDb.get(`cezalı`) || [];
    let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!sure || !ms(sure) || !reason) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.a_Prefix}jail @Antiperes/ID <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
  let jailzaman = args[1]
    .replace(`d`," Gün")
    .replace(`s`," Saniye")
    .replace(`h`," Saat")
    .replace(`m`," Dakika")
    .replace(`w`," Hafta")
  let ceza = {
      No: cezano,
      Cezalanan: uye.id,
      Yetkili: message.author.id,
      Tip: "JAIL",
      Tur: "Cezalandırılma",
      Sebep: reason,
      AtilanSure: jailzaman,
      BitisZaman: "Şuan da cezalı",
      Zaman: Date.now() 
    };
  await uye.roles.set(uye.roles.cache.has(acar.Roller.boosterRolu) ? [acar.Roller.boosterRolu, acar.Roller.jailRolu] : [acar.Roller.jailRolu]).catch();
  if (!jaildekiler.some(j => j.id == uye.id)) {
    cezaDb.push(`cezalı`, {id: uye.id,No: cezano, kalkmaZamani: Date.now()+ms(sure)});
    kDb.add(`k.${message.author.id}.jail`, 1);
    kDb.push(`k.${uye.id}.sicil`, ceza);
    kDb.set(`ceza.${cezano}`, ceza);
  };
  
  cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(`${jailicon} ${uye} kişisi **${reason}** nedeni ile **${jailzaman}** süresince __cezalıya atıldı__. (Ceza Numarası: #${cezano})`).catch().then(sil => sil.delete({timeout: 10000}));
  message.react("✅")
  if(acar.Kanallar.jailLogKanali && client.channels.cache.has(acar.Kanallar.jailLogKanali)) client.channels.cache.get(acar.Kanallar.jailLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${jailzaman}** boyunca **${reason}** nedeniyle **${client.tarihsel}** tarihin de cezalıya atıldı.`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`)).catch();

    }
};