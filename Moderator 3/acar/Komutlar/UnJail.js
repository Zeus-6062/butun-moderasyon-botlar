const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kullaniciverisi = new qDb.table("aKullanici");
const kullanicicinsiyet = new qDb.table("aCinsiyet");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "unjail",
    Komut: ["cezalıçıkar"],
    Kullanim: "cezalıçıkar @acar/ID",
    Aciklama: "Belirlenen üyeyi cezalıdan çıkartır.",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(client.altbaslik)
    let cezano = cezaNoDb.get(`cezano.${client.sistem.a_SunucuID}`);
    if(!acar.Roller.jailHammer || !acar.Roller.jailHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!acar.Roller.jailHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}unjail @Antiperes/ID\``).then(x => x.delete({timeout: 5000}));
    if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).then(sil => sil.delete({timeout: 5000}));
    let jaildekiler = cezaDb.get(`cezalı`) || [];
    let kalıcıjaildekiler = cezaDb.get(`kalıcıcezalı`) || [];
    if (kalıcıjaildekiler.some(j => j.includes(uye.id))) cezaDb.set(`kalıcıcezalı`, kalıcıjaildekiler.filter(x => !x.includes(uye.id)));
    if (jaildekiler.some(j => j.id === uye.id)) cezaDb.set(`cezalı`, jaildekiler.filter(x => x.id !== uye.id));
    kullaniciverisi.set(`ceza.${jaildekiler.No}.BitisZaman`, Date.now());
    let erkeks = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.kayıtRolleri.erkekRolleri);
    let teyitsiz = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.kayıtRolleri.kayıtsızRolleri);
    let kizs = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.kayıtRolleri.kadinRolleri);
    let cinsiyet  = kullanicicinsiyet.get(`veri.${uye.id}.cinsiyet`);
    if(cinsiyet == `erkek`) {
         try {
           uye.roles.set(erkeks)

         } catch(err) { console.log(err) }
     } else {
        if(cinsiyet == `kadin`) {
         try {
           uye.roles.set(kizs)

         } catch(err) { console.log(err) }
      } else {
        try {
           uye.roles.set(teyitsiz)
           if(acar.IkinciTag) uye.setNickname(`${acar.IkinciTag} İsim | Yaş`).catch();
           else if(acar.Tag) uye.setNickname(`${acar.Tag} İsim | Yaş`).catch();    
         } catch(err) { console.log(err) }
      }
     }
    if(uye.voice.channel) uye.voice.kick().catch();
    message.channel.send(embed.setDescription(`${uye} (\`${uye.id}\`) üyesi, ${message.author} (\`${message.author.id}\`) tarafından cezalıdan çıkarıldı.`)).then(sil => sil.delete({timeout: 7500})).catch();
    message.react("✅")
    if(acar.Kanallar.jailLogKanali && client.channels.cache.has(acar.Kanallar.jailLogKanali)) client.channels.cache.get(acar.Kanallar.jailLogKanali).send(embed.setDescription(`${uye} üyesi, ${message.author} tarafından **${client.tarihsel}** tarihin de cezalıdan çıkartıldı.`).setFooter(client.altbaslik)).catch();

    }
};
