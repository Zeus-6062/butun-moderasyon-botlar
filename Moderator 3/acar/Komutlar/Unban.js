const { GuildMember, MessageEmbed,Client} = require("discord.js");
const qDb = require("quick.db");
const cezaDb = new qDb.table("aCezalar");
const cezaNoDb = new qDb.table("aVeri");
const kDb = new qDb.table("aKullanici");
const moment = require('moment');
const acar = client.veri;
module.exports = {
    Isim: "unban",
    Komut: ["yasakkaldir", "yasakkaldır"],
    Kullanim: "yasakkaldır @acar/ID <sebep>",
    Aciklama: "Belirlenen üyenin sunucudaki yasağını kaldırır.",
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
    let embed = new MessageEmbed().setColor('0x2f3136').setAuthor(acar.Tag + " " + acar.sunucuIsmi, message.guild.iconURL({dynamic: true, size: 2048})).setFooter(client.altbaslik)
    if(!acar.Roller.banHammer) return message.channel.send("Sistemsel hata: Rol bulunamadı veya rol bilgileri girilemedi.").then(x => x.delete({timeout: 5000}));
    if(!acar.Roller.banHammer.some(rol => message.member.roles.cache.has(rol)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Hata: Bu komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`).then(x => x.delete({timeout: 5000}));
    if (!args[0] || isNaN(args[0])) return message.channel.send(`Hata: Lütfen bir üye Id giriniz!  __Örn:__  \`${client.sistem.a_Prefix}unban <ID> <sebep> \``).then(x => x.delete({timeout: 5000}));
    let sorguid = args[0]
    let kisi = await client.users.fetch(sorguid);
    if(kisi) {
      let reason = args.splice(1).join(" ") || "Af";
     if(!reason) return message.channel.send(`Hata: Lütfen kaldırma sebebi giriniz!  __Örn:__  \`${client.sistem.a_Prefix}unban <ID> <sebep> \``).then(x => x.delete({timeout: 5000}))
      try {
        message.guild.fetchBans().then(yasaklar=> {
           if(yasaklar.size == 0) return message.channel.send(`Hata: Sunucu da hiç yasaklama bulunamadı.`).then(x => x.delete({timeout: 5000}));
            let yasakliuye = yasaklar.find(yasakli => yasakli.user.id == sorguid)
            if(!yasakliuye) return message.channel.send(`Hata: Belirtilen ID numarasına sahip bir yasaklama bulunamadı!`).then(x => x.delete({timeout: 5500}));
            message.guild.members.unban(kisi.id);
            message.react("✅")
            message.channel.send(`${kisi.tag} (\`${kisi.id}\`), isimli üyenin yasaklaması **${reason}** sebepi ile ${message.author} (\`${message.author.id}\`) tarafından kaldırıldı.`).then(sil => sil.delete({timeout: 7500}));
            if(acar.Kanallar.banLogKanali && client.channels.cache.has(acar.Kanallar.banLogKanali)) client.channels.cache.get(acar.Kanallar.banLogKanali).send(embed.setTitle('Bir Yasaklama Kaldırıldı').setDescription(`Yasaklamayı Kaldıran Yetkili: ${message.author} (\`${message.author.id}\`)\nYasaklaması Kaldırılan Üye: ${kisi.tag} (\`${kisi.id}\`)\nSebep: **${reason}**`));
             })
      } catch (err) {
          console.log(err)
      }  
    } else {
      message.channel.send("Hata: Geçerli bir kişi ID'si belirtmelisin!").then(x => x.delete({timeout: 5000}));
    };
  }
};