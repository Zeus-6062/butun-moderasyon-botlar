const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "ceza",
    Komut: ["cezalar"],
    Kullanim: "ceza sıfırla / ceza temizle <#Ceza-No> / ceza bilgi <#Ceza-No>",
    Aciklama: "Belirlenen bir numaranın cezasını kontrol eder ve cezanın bütün bilgilerini çıkarır",
    Kategori: "Yönetim Komutları",
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
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0])|| (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  
  let sorgu = args[0];
   
  if(sorgu == "bilgi" || sorgu == "info") {
    if(!args[1]) return message.channel.send(`Hata: Lütfen geçerli bir ceza numarası giriniz.`).then(x => x.delete({timeout: 5000}));
    if(Number(args[1]) && args[1].length < 15) {
        let ceza = await kDb.fetch(`ceza.${args[1]}`)
        if(!ceza){
            return message.channel.send(`Hata: (\`#${args[1]}\`) numaralı ceza bulunamadı.`).then(x => x.delete({timeout:6500}));
        }
        let aylartoplam = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran",
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
          };
        let aylar = aylartoplam;
        let kisi = await client.users.fetch(ceza.Cezalanan).catch();
        let kisibilgi;
        if(kisi != `\`Bulunamayan Üye\`` && kisi.username) kisibilgi = `${kisi} (\`${kisi.id}\`)`;
        if(!kisibilgi) kisibilgi = "Bilinmiyor"
        let kisi2 = await client.users.fetch(ceza.Yetkili).catch();
        let kisibilgi2;
        if(kisi2 != `\`Bulunamayan Üye\`` && kisi2.username) kisibilgi2 = `${kisi2} (\`${kisi2.id}\`)`;
        if(!kisibilgi2) kisibilgi2 = "Bilinmiyor"
        let Zaman = ceza.Zaman;
        let Bz = ceza.BitisZaman;
        let cezabitme;
        let cezaZaman = ceza.AtilanSure || `Yok!`;
        if(isNaN(Bz)){
         cezabitme = Bz;
        } else {
       cezabitme = moment(Bz).format("DD") + " " + aylar[moment(Bz).format("MM")] + " " + moment(Bz).format("YYYY HH:mm:ss") + " - Bitti !"
        }
       let cezabas = moment(Zaman).format("DD") + " " + aylar[moment(Zaman).format("MM")] + " " + moment(Zaman).format("YYYY HH:mm:ss") 
        message.channel.send(embed.setDescription(`
        » Üye Bilgisi: ${kisibilgi}
        » Yetkili Bilgisi: ${kisibilgi2}
        » Ceza Tarihi: \`${cezabas}\`
        » Ceza Süresi: \`${cezaZaman}\`
        » Ceza Durumu: \`${cezabitme}\`
        `).addField(`» Ceza Türü`, `__` + ceza.Tur + `__` , true).addField(`Ceza Sebebi`,ceza.Sebep,true).setFooter(client.altbaslik + ` • Ceza Numarası #${ceza.No}`))
    }
  return 
  };  

  if(sorgu == "temizle") {
    if(!message.member.roles.cache.has(acar.Roller.kurucuRolu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000})); 
  let cn = args[1]
  if(!cn) return message.channel.send(`Hata: Lütfen bir üye Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}ceza temizle <#Ceza-No>\``).then(x => x.delete({timeout: 5000}));
  let ceza = await kDb.fetch(`ceza.${args[1]}`)
  if(!ceza) {
    message.channel.send(`Hata: (\`#${cn}\`) numaralı ceza bulunamadı.`).then(sil => sil.delete({timeout: 5000}));
  } else {
    let kisi = await client.users.fetch(ceza.Cezalanan).catch();
    let kisibilgi;
    if(kisi != `\`Bulunamayan Üye\`` && kisi.username) kisibilgi = `${kisi} (\`${kisi.id}\`)`;
    if(!kisibilgi) kisibilgi = "Bilinmiyor"
    kDb.delete(`ceza.${args[1]}`) 
    message.channel.send(`${kisibilgi}, isimli üyenin belirlenen (\`#${cn}\`) ceza geçmişi temizlendi!`).then(x => x.delete({timeout: 5000})); 
    message.react("✅")
  }
  return  
};
if(sorgu == "sıfırla") {
  if(!message.member.roles.cache.has(acar.Roller.kurucuRolu)) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000})); 
  kDb.delete(`ceza`);
  cezaNoDb.delete(`cezano`) 
  message.channel.send(`Bu sunucunun (\`${client.sistem.a_sunucuId}\`) tüm üyelerin ceza ve sunucu ceza numaralarının bilgileri komple temizlendi!`).then(x => x.delete({timeout: 5000})); 
  message.react("✅")
  return 
};
  message.channel.send(`Hata: Ceza sorgusu yapmak için öncelikle __Ceza Numarası__ ID'sine ihtiyacın var __Örn__: \`${client.sistem.a_Prefix}ceza bilgi <#Ceza-No>\``).then(sil => sil.delete({timeout: 5000}));
}
};