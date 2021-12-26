const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "teyit",
    Komut: ["teyitlerim"],
    Kullanim: "teyit sıfırla ID / teyit top / teyit @acar/ID",
    Aciklama: "Belirlnen üyenin teyitlerini gösterir.",
    Kategori: "Kayıt Komutları",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
  client.sayilariCevir = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   };
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
  let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(client.altbaslik)
  if((!acar.kayıtRolleri.erkekRolleri && !acar.kayıtRolleri.kadinRolleri) || !acar.kayıtRolleri.kayıtYapanRoller) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
  if(!acar.kayıtRolleri.kayıtYapanRoller.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0])|| (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
  let sorgu = args[0];
  let teyitBilgisi = ``;
  if(sorgu == "temizle" || sorgu == "sıfırla") {
    if(!message.member.roles.cache.has(acar.Roller.kurucuRolu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    let kullanicitemizle = client.users.cache.get(args[1])
    let uye2 = message.guild.member(kullanicitemizle);
  if(!uye2) return message.channel.send(`Hata: Lütfen bir üye Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}teyit temizle <ID>\``).then(x => x.delete({timeout: 5000}));
  kDb.delete(`teyit.${uye2.id}.erkekteyit`); 
  kDb.delete(`teyit.${uye2.id}.kadinteyit`); 
  message.channel.send(embed.setDescription(`${uye2} (\`${uye2.id}\`), isimli üyenin bütün teyit geçmişi temizlendi!`)).then(x => x.delete({timeout: 5000})); 
  message.react("✅")
  return 
};

if(sorgu == "top" || sorgu == "sıralama") {
    let data = await kDb.get("teyit") || {};
    let arr = Object.keys(data);
    let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkekteyit || 0) + (data[b].kadinteyit || 0)) - Number((data[a].erkekteyit || 0) + (data[a].kadinteyit || 0))).map((value, index) => `${index + 1}. ${message.guild.members.cache.get(value)} [**${client.sayilariCevir((data[value].erkekteyit || 0) + (data[value].kadinteyit || 0))}**]`).splice(0, 30);
    message.channel.send(embed.setThumbnail(acar.embedUfakResim).setDescription(`**Teyit Sıralaması**\n\n${listedMembers.join("\n") || "Sistemsel teyit verisi bulunamadı!"}`)).then(tepki => tepki.react("📄")).catch();
 return   
};

  let teyit = kDb.get(`teyit.${uye.id}`);
  if(teyit){
    let erkekTeyit = teyit.erkekteyit || 0;
    let kizTeyit = teyit.kadinteyit || 0;
    teyitBilgisi += `${kullanici} (\`${kullanici.id}\`) toplam **${erkekTeyit+kizTeyit}** kayıt yapmış! (**${erkekTeyit}** erkek, **${kizTeyit}** kadın)\n`;
  };
   message.channel.send(embed.setDescription(teyitBilgisi)).catch();
    }
};