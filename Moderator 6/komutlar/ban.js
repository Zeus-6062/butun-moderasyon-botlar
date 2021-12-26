const banAtanlar = new Set();
const moment = require("moment");

const tarih = moment(Date.parse(new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul"}))).format("LLL");

module.exports.operate = async ({msg, client, uye, author, args, db, cfg}) => {
  if (!author.permissions.has("BAN_MEMBERS") && !author.roles.cache.get(cfg.roles.banH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üyeyi etiketlemelisin.**").then(x => x.delete({ timeout: 5000 }));
  if (uye.permissions.has("BAN_MEMBERS") && uye.roles.cache.get(cfg.roles.banH)) return msg.channel.send("**Ban yetkisi olan birisini banlayamazsın.**").then(a => a.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  if (!banAtanlar[msg.author.id]) banAtanlar[msg.author.id] = { sayi: 0 };
  if (banAtanlar[msg.author.id].sayi >= 3) return msg.channel.send("**1 saat içinde maximum 3 ban atabilirsin.**").then(a => a.delete({ timeout: 5000 }));
  let reason = args.slice(1).join(" ") || "Sebep Girilmedi.";
  const sicil = db.get(`sicil_${uye.id}`);
  if (!sicil) db.set(`sicil_${uye.id}`, []);
  await msg.guild.members.ban(uye.id, {reason: reason, days: 7 }).catch(err => msg.channel.send(err.message));
  await msg.channel.send({embed:{description:`**${uye.user.tag}** adlı üye ${msg.author} tarafından **${reason}** sebebiyle sunucudan yasaklandı`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).catch();
  db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "ban", sebep: reason, zaman: Date.now() });
  db.add(`banAtma_${author.id}`, 1);
  banAtanlar[msg.author.id].sayi++;
  setTimeout(() => {
    if (banAtanlar[msg.author.id].sayi >= 1) {
      banAtanlar[msg.author.id].sayi = 0;
    };
  }, 3600000);
};

module.exports.help = {
  name: "ban",
  alias: ["yak", "yargı", "yoket", "idam"]
};