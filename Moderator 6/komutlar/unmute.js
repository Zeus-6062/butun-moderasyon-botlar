module.exports.operate = async ({client, msg, uye, author, cfg, db}) => {
  const muteAtan = cfg.roles.yetkiliRoller.muteHammer;
  let muteLog = msg.guild.channels.cache.find(c => c.name === "mute-log");
  if (!author.roles.cache.get(muteAtan) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }))
  if (!uye) return msg.channel.send('**Bir üye etiketlemelisin**').then(m => m.delete({ timeout: 5000 }));
  if (uye.roles.cache.get(cfg.roles.muted)) {
    const tempmuteler = db.get(`tempmute_${msg.guild.id}`) || [];
    await uye.roles.remove(cfg.roles.muted).catch();
    if (tempmuteler.some(m => m.id === uye.id)) db.set(`tempmute_${msg.guild.id}`, tempmuteler.filter(x => x.id !== uye.id));
    if (muteLog) muteLog.send({ embed: { description: `${uye} adlı üyenin mutesi ${author} tarafından kaldırıldı.` , color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date() }});
  } else {
    msg.channel.send("**Bu üye zaten muteli değil.**").then(i => i.delete({ timeout: 5000 }));
  };
};

module.exports.help = {
  name: "unmute",
  alias: [],
  description: ""
};