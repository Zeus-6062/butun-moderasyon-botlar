const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const db = require("quick.db");
const kullaniciverisi = new db.table("aKullanici");
const acar = client.veri.kayıtRolleri;
const acarveri = client.veri;
module.exports = {
    Isim: "afk",
    Komut: ["afk"],
    Kullanim: "afk <sebep>",
    Aciklama: "Belirlenen sebep ile klavyeden uzak olduğunuzu belirler!",
    Kategori: "Üye",
    TekSunucu: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {
    client.tarihHesapla = (date) => {
        const startedAt = Date.parse(date);
        var msecs = Math.abs(new Date() - startedAt);
      
        const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
        msecs -= years * 1000 * 60 * 60 * 24 * 365;
        const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
        msecs -= months * 1000 * 60 * 60 * 24 * 30;
        const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
        msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
        const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
        msecs -= days * 1000 * 60 * 60 * 24;
        const hours = Math.floor(msecs / (1000 * 60 * 60));
        msecs -= hours * 1000 * 60 * 60;
        const mins = Math.floor((msecs / (1000 * 60)));
        msecs -= mins * 1000 * 60;
        const secs = Math.floor(msecs / 1000);
        msecs -= secs * 1000;
      
        var string = "";
        if (years > 0) string += `${years} yıl ${months} ay`
        else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
        else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
        else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
        else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
        else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
        else if (secs > 0) string += `${secs} saniye`
        else string += `saniyeler`;
      
        string = string.trim();
        return `\`${string} önce\``;
      };
    client.on("message", (message) => {
        if(!message.guild || message.author.bot || message.content.toLowerCase().includes(`.afk`)) return;
        if(message.mentions.users.size >= 1){
          let victim = message.mentions.users.first();
          if(db.has(`${victim.id}.afk`)) {
            let data = db.get(`${victim.id}.afk`);
            let tarih = client.tarihHesapla(data.sure);
            return message.channel.send(`${victim} adlı üye __${data.sebep ? `**${data.sebep}**__ sebebiyle ` : ""}${tarih} AFK oldu.`).then(x => x.delete({timeout: 10000}));;
          };
        };
        if(!db.has(`${message.author.id}.afk`)) return;
        if(message.member.manageable) message.member.setNickname(message.member.displayName.replace("[AFK]", "")).catch();
        db.delete(`${message.author.id}.afk`);
        message.channel.send(`Hoşgeldin ${message.author}, artık __AFK__ modunda değilsin!`).then(x => x.delete({timeout: 7000}));
      });
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async function (client, message, args, guild) {
    message.delete()
     let tarih = client.tarihHesapla(Date.Now);
    if(db.get(`${message.author.id}.afk`)) return message.channel.send(`Hata: AFK durumdayken tekrardan __AFK__ olamazsın ${message.member}!`).then(x => x.delete({timeout: 5000}));
    let sebep = args.join(' ') || `Şuan da işim var yakın zaman da döneceğim!`;
    if(sebep.includes("@here") || sebep.includes("@everyone")) return message.channel.send(`Hata: Lütfen geçerli bir __AFK__ sebebi belirtmelisin ${message.member}!`).then(x => x.delete({timeout: 5000}));;
    if (sebep && (await client.chatKoruma(sebep))) return message.channel.send(`Hata: Lütfen geçerli bir __AFK__ sebebi belirtmelisin ${message.member}!`).then(x => x.delete({timeout: 5000}));;
    if (sebep) db.set(`${message.author.id}.afk.sebep`, sebep);
    db.set(`${message.author.id}.afk.sure`, new Date());
    if (message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(console.log);
    message.channel.send(`${client.emoji(acarveri.Emojiler.Onay)}  ${message.member} adlı üye ${tarih}  __**${sebep}**__ sebebi ile AFK moduna girdi!`).then(x => x.delete({timeout: 10000}));
  
   }
};
