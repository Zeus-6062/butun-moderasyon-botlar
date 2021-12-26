module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  const evet = "✅";
  const hayir = "❌";
  const kanal = msg.guild.channels.cache.find(c => c.name === "jail-log");
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  const reason = args.slice(1).join(" ") || "Sebep Girilmedi.";
  const sicil = db.get(`sicil_${uye.id}`);
  if (!uye.roles.cache.get(cfg.roles.jail)) {
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    await uye.roles.set(uye.roles.cache.has(cfg.roles.booster) ? [cfg.roles.jail, cfg.roles.booster] : [cfg.roles.jail]).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`)).then(m => m.delete({ timeout: 5000})).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "jail", sebep: reason, zaman: Date.now() });
    await db.add(`jailAtma_${author.id}`, 1);
    if (uye.voice.channel) uye.voice.kick().catch();
    if (kanal) kanal.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`));
  } else {
    function GaripBirAdamımEvet(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
    await msg.channel.send({embed:{author:{icon_url: msg.guild.iconURL({dynamic:true}),name:msg.guild.name},description:`**${uye} adlı üye zaten jailde. Eğer işlemi onaylarsan üyeyi jailden çıkartacağım.**`, timestamp:new Date(),color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async m => {
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
          if (kanal) kanal.send(client.nrmlembed(`**${uye} ${author} adlı üye tarafından jailden çıkartıldı.**`));
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
  name: "jail",
  alias: ["ceza"]
};