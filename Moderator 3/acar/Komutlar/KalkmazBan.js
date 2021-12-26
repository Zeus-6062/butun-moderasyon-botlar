const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "kb",
    Komut: ["kalkmazban"],
    Kullanim: "kalkmazban ID <sebep>",
    Aciklama: "Taç sahibi veya bot sahibi tarafına hazırlanmış bir komuttur banı kaldırılsa dahi tekrardan sunucuya girdiğinde tekrardan ban yemesini sağlar.",
    Kategori: "Bot/Taç",
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
   */
  onRequest: async function (client, message, args) {
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`) + 1;
    let embed = new MessageEmbed().setColor('0x2f3136').setTitle(`Kalkmazban`).setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    if(!message.member.roles.cache.has(client.veri.Roller.kurucuRolu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let kullanıcılar = await qDb.get(`akb_${message.guild.id}`)
    let kullanıcı = args[0];
    let reason = args.splice(1).join(" ");
    let ceza = {
        No: cezano,
        Cezalanan: kullanıcı,
        Yetkili: message.author.id,
        Tip: "BOTBAN",
        Tur: "KALKMAYAN BAN",
        BitisZaman: "Affa kalmış!",
        Sebep: reason,
        Zaman: Date.now() 
      };
    if(args[0] === "liste") {
     message.channel.send(`# Kalıcı ban sistemi ile yasaklanmış kullanıcı(lar) ; ⛔\n\n${kullanıcılar.map(x => x.slice(1)).join('\n')}\n\n# Toplam (${kullanıcılar.length}) adet bot sistemi ile yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true})
      return
    }
    if(!kullanıcı || isNaN(kullanıcı) || kullanıcı.length > 20 || kullanıcı.length < 10) return message.channel.send(`Bilgi: Kalkmazban sistemi ile birini yasaklamak/kaldırmak için __ID__ giriniz! Listelemek için __${client.sistem.a_Prefix}kalkmazban liste__ komutunu kullanın!`).then(x => x.delete({timeout: 10000}));
    if(kullanıcılar && kullanıcılar.some(id => `k${kullanıcı}` === id)) {
        qDb.delete(`akb_${message.guild.id}`, `k${kullanıcı}`)
        kullanıcılar.forEach(v => {
        if (!v.includes(`k${kullanıcı}`)) {
          qDb.push(`akb_${message.guild.id}`, v)
        }
        })
      message.guild.members.unban(kullanıcı);
      message.channel.send(`Başarılı: \`${kullanıcı}\` ID'li kullanıcı artık sunucuya __girebilecek__!`).then(x => x.delete({timeout: 5000}));
    } else {
        if(!reason) return message.channel.send(`Hata: Lütfen tüm argümanları veya sebepi belirleyin!  __Örn:__  \`${client.sistem.a_Prefix}kalkmazban ID <sebep>\``).then(x => x.delete({timeout: 5000}));
      await qDb.push(`akb_${message.guild.id}`, `k${kullanıcı}`)
      if(message.guild.members.cache.has(kullanıcı)) {
        message.guild.members.ban(kullanıcı, {reason: `Bot kalkmazban sistemi ile banlandı! (Ceza Numarası: #${cezano}) ile sorgulayın!`}).catch();
      }
      cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
      kDb.add(`k.${message.author.id}.kalkmazban`, 1);
      kDb.push(`k.${kullanıcı}.sicil`, ceza);
      kDb.set(`ceza.${cezano}`, ceza);
      if(acar.Kanallar.banLogKanali && client.channels.cache.has(acar.Kanallar.banLogKanali)) client.channels.cache.get(acar.Kanallar.banLogKanali).send(embed.setDescription(`» Yasaklayan Yetkili: ${message.author} (\`${message.author.id}\`)\n» Yasaklanan Üye: (\`${kullanıcı}\`) \n» Sebep: **${reason}**\n Bot sahibi veya taç sahibi tarafından bot üzerinden yasaklanmıştır.`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`));
      message.channel.send(`Başarılı: \`${kullanıcı}\` ID'li kullanıcı artık __${reason}__ sebepi ile bu sunucuya asla __giremeyecek__ (Ceza Numarası: #${cezano})!`).then(x => x.delete({timeout: 5000}));
    }
  }
};
