const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "permjail",
    Komut: ["kalıcıjail","kalıcıcezalı"],
    Kullanim: "kcezalı @acar/ID <sebep>",
    Aciklama: "Belirlenen üyeyi kalıcı olarak cezalıya atar.",
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
    let reason = args.splice(1).join(" ");
    if(!uye || !reason) return message.channel.send(`Hata: Lütfen üye belirleyin veya sebep belirleyin!  __Örn:__  \`${client.sistem.a_Prefix}permjail @Antiperes/ID <sebep>\``).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let jaildekiler = cezaDb.get(`kalıcıcezalı`) || [];
    uye.roles.set(uye.roles.cache.has(acar.Roller.boosterRolu) ? [acar.Roller.jailRolu, acar.Roller.boosterRolu] : [acar.Roller.jailRolu]).catch();
    let ceza = {
      No: cezano,
      Cezalanan: uye.id,
      Yetkili: message.author.id,
      Tip: "PJAIL",
      Tur: "Kalıcı Cezalandırılma",
      Sebep: reason,
      BitisZaman: "SÜRESİZ",
      Zaman: Date.now() 
    };
  if (!jaildekiler.some(j => j.includes(uye.id))) {
    cezaDb.push(`kalıcıcezalı`, `j${uye.id}`);
    kDb.add(`k.${message.author.id}.jail`, 1);
    kDb.push(`k.${uye.id}.sicil`, ceza);
    kDb.set(`ceza.${cezano}`, ceza)
  };
  cezaNoDb.add(`cezano.${client.sistem.a_SunucuID}`, 1)
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(`${jailicon} ${uye} kişisi **${reason}** nedeni ile süresiz olarak __cezalıya atıldı__. (Ceza Numarası: #${cezano})`).catch().then(sil => sil.delete({timeout: 10000}));
  message.react("✅")
  if(acar.Kanallar.jailLogKanali && client.channels.cache.has(acar.Kanallar.jailLogKanali)) client.channels.cache.get(acar.Kanallar.jailLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${reason}** nedeniyle **${client.tarihsel}** tarihin de kalıcı olarak cezalıya atıldı.`).setFooter(client.altbaslik + ` • Ceza Numarası: #${cezano}`)).catch();

    }
};