const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "kick",
    Komut: ["at"],
    Kullanim: "at @acar/ID <sebep>",
    Aciklama: "Belirlenen üyeyi sunucudan atmasını sağlar.",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
    if(!acar.Roller.banHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
    if(!acar.Roller.banHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    if (!victim || !reason) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.a_Prefix}kick @Antiperes/ID sebep\``).then(x => x.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send("Hata: Atmaya çalıştığın üye senle aynı yetkide veya senden üstün.").then(x => x.delete({timeout: 5000}));
    if(!victim.kickable) return message.channel.send("Hata: __Yönetim/Erişim__ yetersiz bot yetkisi nedeniyle iptal edildi!").then(x => x.delete({timeout: 5000}));
    await victim.send(`${message.author} (\`${message.author.id}\`) tarafından **${reason}** sebebiyle sunucudan __atıldın__.`).catch();
    victim.kick({reason: reason}).then(x => message.react("✅")).catch();
    let ceza = {
        No: cezano,
        Cezalanan: victim.id,
        Yetkili: message.author.id,
        Tip: "KICK",
        Tur: "Atılma",
        Sebep: reason,
        Zaman: Date.now() 
      };
    kDb.add(`k.${message.author.id}.kick`, 1);
    kDb.push(`k.${victim.id}.sicil`, ceza);
    kDb.set(`ceza.${cezano}`, ceza);
    cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
    message.channel.send(`${victim.user.tag} (\`${victim.user.id}\`) üyesi ${message.author} (\`${message.author.id}\`) isimli yetkili tarafından **${reason}** nedeniyle __atıldı__. (Ceza Numarası: #${cezano})`).then(sil => sil.delete({timeout: 7500}));
    message.react("✅")
    if(acar.Kanallar.banLogKanali && client.channels.cache.has(acar.Kanallar.banLogKanali)) client.channels.cache.get(acar.Kanallar.banLogKanali).send(embed.setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`).setDescription(`Yetkili: ${message.author} (\`${message.author.id}\`)\nÜye: ${victim.user.tag} (\`${victim.user.id}\`)\nSebep: **${reason}**`));
  
  }
};