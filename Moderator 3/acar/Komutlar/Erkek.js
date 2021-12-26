const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const kullanicicinsiyet = new db.table("aCinsiyet");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
const Ayarlar = client.veri.tepkiId;
const acarkanallar = client.veri.Kanallar;
module.exports = {
    Isim: "erkek",
    Komut: ["e", "er"],
    Kullanim: "erkek @acar/ID <isim> <yaş>",
    Aciklama: "Belirlenen üyeyi sunucu da erkek olarak kayıt eder",
    Kategori: "Kayıt Komutları",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setFooter(client.altbaslik).setAuthor(acarveri.Tag + " " + acarveri.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048}))
    if((!acar.erkekRolleri && !acar.kadinRolleri) || !acar.kayıtYapanRoller) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(sil => sil.delete({timeout: 5000}));
    if(!acar.kayıtYapanRoller.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin.`).then(sil => sil.delete({timeout: 5000}));
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`Hata: Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}erkek @Antiperes/ID isim yaş\``).then(sil => sil.delete({timeout: 5000}));
    if(message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(`Hata: Belirlediğiniz üye sizden yetkili veya aynı yetkidesiniz.`).then(sil => sil.delete({timeout: 5000}));
    if(acar.erkekRolleri.some(erkek => uye.roles.cache.has(erkek))) return message.channel.send(`Hata: Belirlediğiniz üye sunucuda zaten kayıtlı ne için tekrardan kayıt ediyorsun?`).then(sil => sil.delete({timeout: 5000}));
    if(acar.kadinRolleri.some(kadin => uye.roles.cache.has(kadin))) return message.channel.send(`Hata: Belirlediğiniz üye sunucuda zaten kayıtlı ne için tekrardan kayıt ediyorsun?`).then(sil => sil.delete({timeout: 5000}));
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let BelirlenenIsim;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(`Hata: Lütfen tüm argümanları doldurunuz!  __Örn:__  \`${client.sistem.a_Prefix}erkek @Antiperes/ID isim yaş\``).then(sil => sil.delete({timeout: 5000}));
        BelirlenenIsim = `${uye.user.username.includes(acarveri.Tag) ? acarveri.Tag : (acarveri.IkinciTag ? acarveri.IkinciTag : (acarveri.Tag || ""))} ${isim} | ${yaş}`;
        uye.setNickname(`${BelirlenenIsim}`).catch();
		       if(uye.user.username.includes(acarveri.Tag)) uye.roles.add(acar.tagRolu).catch();
               if(uye.user.discriminator.includes(acarveri.Tag2)) uye.roles.add(acar.tagRolu).catch();
            let erkek = uye.roles.cache.filter(x => x.managed).map(x => x.id).concat(acar.erkekRolleri)
            uye.roles.set(erkek).catch();
        kullaniciverisi.push(`k.${uye.id}.isimler`, {
            Isim: BelirlenenIsim,
            Yetkili: message.author.id,
            Zaman: Date.now()
        });
            kullaniciverisi.add(`teyit.${message.author.id}.erkekteyit`, 1);
            kullanicicinsiyet.push(`veri.${uye.id}.cinsiyet`, `erkek`);
            message.channel.send(embed.setDescription(`${uye}, adlı üye başarıyla ${message.author}, tarafından **Erkek** olarak kayıt edildi.`)).then(sil => sil.delete({timeout: 15000}));	   
       message.react("✅"); 
    }
};
