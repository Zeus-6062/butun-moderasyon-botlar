module.exports.operate = async ({client, msg, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({ timeout: 5000 }));
  if (uye.roles.cache.get(cfg.roles.botc) || uye.roles.cache.get(cfg.roles.booster) || uye.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Bir yetkiliyi veya boosteri unregistere atamazsın.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  await uye.roles.set([cfg.roles.unregister]);
  await msg.channel.send(client.nrmlembed(`${uye}** adlı üye başarıyla kayıtsıza atıldı.**`)).then(msj => msj.delete({ timeout: 2000 }));
};

module.exports.help = {
  name: "unreg",
  alias: ["unregister"]
};