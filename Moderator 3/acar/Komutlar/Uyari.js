const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
const ms = require('ms');
module.exports = {
    Isim: "uyar",
    Komut: ["uyarı","uyar"],
    Kullanim: "uyarı @acar/ID <uyarı açıklaması>",
    Aciklama: "Belirlenen üyeye uyarı belirleyerek ceza işlemi yapar.",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
    if(!acar.Roller.warnHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
    if(!acar.Roller.warnHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if(!uye || !reason) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id girin!  __Örn:__  \`${client.sistem.a_Prefix}uyarı @Antiperes/ID <sebep>\``).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(x => x.delete({timeout: 5000}));
    let ceza = {
        No: cezano,
        Cezalanan: uye.id,
        Yetkili: message.author.id,
        Tip: "WARN",
        Tur: "Uyarılma",
        BitisZaman: "Uyarılma",
        Sebep: reason,
        Zaman: Date.now() 
      };
      kDb.add(`k.${message.author.id}.uyari`, 1);
      kDb.push(`k.${uye.id}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza);
      cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
    message.channel.send(`${uye} (\`${uye.id}\`) üyesi, ${message.author} (\`${message.author.id}\`) tarafından **${reason}** nedeniyle uyarıldı. (Ceza Numarası: #${cezano})`).catch();
    message.react("✅")
    if(acar.Kanallar.uyarıLogKanali && client.channels.cache.has(acar.Kanallar.uyarıLogKanali)) client.channels.cache.get(acar.Kanallar.uyarıLogKanali).send(embed.setDescription(`$${uye} (\`${uye.id}\`) üyesi, ${message.author} (\`${message.author.id}\`) tarafından **${reason}** nedeniyle uyarıldı.`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`)).catch();
  
    }
};