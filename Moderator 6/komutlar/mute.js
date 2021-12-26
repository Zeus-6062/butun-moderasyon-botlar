const ms = require("ms");
module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  const evet = "✅";
  const hayir = "❌";
  if (!author.roles.cache.get(cfg.roles.muteH) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  const kanal = msg.guild.channels.cache.find(c => c.name === "mute-log");
  const zaman = args[1];
  const reason = args.slice(2).join(" ") || "Sebep Girilmedi.";
  if (!ms(zaman) || !zaman) return msg.channel.send("**Geçerli bir süre girmelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye.roles.cache.get(cfg.roles.muted)) {
    const sicil = db.get(`sicil_${uye.id}`);
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    if (!db.get(`tempmute_${msg.guild.id}`)) db.set(`tempmute_${msg.guild.id}`, []);
    await uye.roles.add(cfg.roles.muted).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle \`${zaman}\` süresince susturulmuştur. `)).then(m => m.delete({timeout: 5000})).catch();
    if (kanal) kanal.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle \`${zaman}\` süresince susturulmuştur.`)).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "mute", sebep: reason, zaman: Date.now() });
    await db.push(`tempmute_${msg.guild.id}`, { id: uye.id, kalkmaZamani: Date.now() + ms(zaman) });
    db.add(`muteAtma_${author.id}`, 1);
    setTimeout(() => {
      const tempmuteler = db.get(`tempmute_${msg.guild.id}`) || [];
      if (tempmuteler.some(m => m.id === uye.id)) db.set(`tempmute_${msg.guild.id}`, tempmuteler.filter(x => x.id !== uye.id));
      uye.roles.remove(cfg.roles.muted).catch();
      msg.channel.send(client.nrmlembed(`${uye}** adlı üyenin mutesi başarıyla kaldırıldı.**`)).then(a => a.delete({ timeout: 5000 }));
      if (kanal) kanal.send(client.nrmlembed(`${uye} **adlı üyenin mutesi ${author} tarafından kaldırıldı.**`)).catch();
    }, ms(zaman));
  } else {
    function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
    await msg.channel.send(client.nrmlembed(`**${uye} adlı üye zaten muteli. Eğer işlemi onaylarsan üyeyi mutesini kaldıracağım.**`)).then(async m => {
      await m.react(evet);
      await m.react(hayir);
      m.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(10, "saniye"), errors: ["time"] }).then(async collected => {
        let cvp = collected.first();
        if (cvp.emoji.name === evet) {
          const tempmuteler = db.get(`tempmute_${msg.guild.id}`) || [];
          if (tempmuteler.some(m => m.id === uye.id)) db.set(`tempmute_${msg.guild.id}`, tempmuteler.filter(x => x.id !== uye.id));
          await uye.roles.remove(cfg.roles.muted).catch();
          msg.channel.send(client.nrmlembed(`${uye}** adlı üyenin mutesi başarıyla kaldırıldı.**`)).then(a => a.delete({ timeout: 5000 }));
          if (kanal) kanal.send(client.nrmlembed(`${uye} **adlı üyenin mutesi ${author} tarafından kaldırıldı.**`)).catch();
        } else {
          m.delete();
          msg.delete();
          msg.channel.send(client.nrmlembed(`**Komut başarıyla iptal edildi.**`)).then(m => m.delete({ timeout: 5000 }));
        };
      }).catch(err => [msg.delete(), m.delete()]);
    });
  };
};

module.exports.help = {
  name: "mute",
  alias: ["chatmute", "cmute", "chat-mute", "tempmute"]
};