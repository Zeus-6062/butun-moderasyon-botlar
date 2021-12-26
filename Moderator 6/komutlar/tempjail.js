const ms = require("ms");
module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  const evet = "✅";
  const hayir = "❌";
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  const zaman = args[1];
  const reason = args.slice(2).join(" ") || "Sebep Girilmedi.";
  if (!ms(zaman) || !zaman) return msg.channel.send("**Geçerli bir süre girmelisin.**").then(m => m.delete({ timeout: 5000 }));
  const sicil = db.get(`sicil_${uye.id}`);
  if (!uye.roles.cache.get(cfg.roles.jail)) {
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    if (!db.get(`tempj_${msg.guild.id}`)) db.set(`tempj_${msg.guild.id}`, []);
    await uye.roles.set(uye.roles.cache.has(cfg.roles.booster) ? [cfg.roles.jail, cfg.roles.booster] : [cfg.roles.jail]).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`)).then(m => m.delete({ timeout: 5000})).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "tempjail", sebep: reason, zaman: Date.now() });
    await db.add(`jailAtma_${author.id}`, 1);
    await db.push(`tempj_${msg.guild.id}`, { id: uye.id, kalkmaZamani: Date.now() + ms(zaman) });
    if (uye.voice.channel) uye.voice.kick().catch();
  } else {
    function GaripBirAdamımEvet(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
    await msg.channel.send({embed:{author:{icon_url: msg.guild.iconURL({dynamic:true}),name:msg.guild.name},description:`**${uye} adlı üye zaten jailde. Eğer işlemi onaylarsan üyeyi jailden çıkartacağım.**`, timestamp:new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async m => {
      await m.react(evet);
      await m.react(hayir);
      m.awaitReactions(GaripBirAdamımEvet,{max:1,time:client.getDate(20, "saniye"),errors:["time"]}).then(async collected => {
        let cvp = collected.first();
        if (cvp.emoji.name === evet) {
          await uye.roles.remove(cfg.roles.jail).catch();
          await uye.roles.add(cfg.roles.unregister).catch();
          await msg.channel.send(client.nrmlembed(`**${uye} adlı üye başarıyla jailden çıkarıldı.**`)).catch();
          await m.delete().catch();
          await msg.delete().catch();
        } else {
          m.delete();
          msg.delete();
          msg.channel.send(client.nrmlembed(`**Komut başarıyla iptal edildi.**`)).then(m => m.delete({ timeout: 5000 }));
        };
      }).catch(err => [m.delete(), msg.delete()]);
    });
  };

};

module.exports.help = {
  name: "tempjail",
  alias: ["tjail", "temp-jail"]
};