module.exports.operate = async ({client, msg, uye, author, cfg, db}) => {
  let muteLog = msg.guild.channels.cache.find(c => c.name === "vmute-log");
  if (!author.roles.cache.get(`776724178246172692`) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send('**Bir üye etiketlemelisin**').then(m => m.delete({ timeout: 5000 }));
  const vmuteler = db.get(`vmute_${msg.guild.id}`) || [];
  if (vmuteler.some(m => m.id === uye.id)) {
    if (muteLog) muteLog.send({ embed: { description: `${uye} adlı üyenin mutesi ${author} tarafından kaldırıldı.` , color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date() }});
    db.set(`vmute_${msg.guild.id}`, vmuteler.filter(x => x.id !== uye.id));
    uye.voice.setMute(false);
  } else {
    msg.channel.send("**Bu üye zaten muteli değil.**").then(i => i.delete({ timeout: 5000 }));
  };
};

module.exports.help = {
  name: "vunmute",
  alias: ["voice-unmute", "voiceunmute", "sesmutekaldır"],
  description: ""
};