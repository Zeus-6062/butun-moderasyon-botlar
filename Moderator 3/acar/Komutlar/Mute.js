const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const ms = require('ms');
const acar = client.veri;
module.exports = {
    Isim: "mute",
    Komut: ["sustur","chatmute","cmute"],
    Kullanim: "sustur @acar/ID <süre> <sebep>",
    Aciklama: "Belirlenen üyeyi metin kanallarında belirlenen süre boyunca susturur.",
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
    let muteicon = client.emojis.cache.get(acar.Emojiler.susturuldu)
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    if(!acar.Roller.muteHammer || !acar.Roller.muteHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!acar.Roller.muteHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}mute @Antiperes/ID <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let muteler = cezaDb.get(`susturulma`) || [];
    let sure = args[1];
    let reason = args.splice(2).join(" ");
    if(!sure || !ms(sure) || !reason) return message.channel.send(`Hata: Lütfen bir süre belirleyin!  __Örn:__  \`${client.sistem.a_Prefix}jail @Antiperes/ID <1s/1m/1h/1d> <sebep>\``).then(sil => sil.delete({timeout: 5000}));
    let mutezaman = args[1]
      .replace(`d`," Gün")
      .replace(`s`," Saniye")
      .replace(`h`," Saat")
      .replace(`m`," Dakika")
      .replace(`w`," Hafta")
    let ceza = {
      No: cezano,
      Cezalanan: uye.id,
      Yetkili: message.author.id,
      Tip: "MUTE",
      Tur: "Susturulma",
      Sebep: reason,
      AtilanSure: mutezaman,
      BitisZaman: "Şuan da susturulu",
      Zaman: Date.now() 
    };
    await uye.roles.add(acar.Roller.muteRolu).catch();
    if (!muteler.some(j => j.id == uye.id)) {
      cezaDb.push(`susturulma`, {id: uye.id,No: cezano,kalkmaZamani: Date.now()+ms(sure)})
      kDb.add(`k.${message.author.id}.mute`, 1);
      kDb.push(`k.${uye.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza)
    };
    cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
    message.channel.send(`${muteicon} ${uye} kişisi **${reason}** nedeni ile **${mutezaman}** süresince metin kanallarında __susturuldu__. (Ceza Numarası: #${cezano})`).catch().then(sil => sil.delete({timeout: 10000}));
   message.react("✅")
    if(acar.Kanallar.muteLogKanali && client.channels.cache.has(acar.Kanallar.muteLogKanali)) client.channels.cache.get(acar.Kanallar.muteLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${mutezaman}** boyunca **${reason}** nedeniyle **${client.tarihsel}** tarihin de metin kanalların da susturuldu.`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`)).catch();
  
     }
};

