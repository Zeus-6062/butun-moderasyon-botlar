module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.permissions.has("MANAGE_NICKNAMES") && !author.roles.cache.get(cfg.roles.botc)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout: 5000 }));
  let isim = args.slice(1).join(" | ");
  if (!isim) return msg.channel.send("**Bir isim girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));
  let tag = uye.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.taglıTag);
  
  await uye.setNickname(`${tag} ${isim}`).catch(err => msg.channel.send(err.message));
  await msg.channel.send(client.duzembed(`**İstediğin kullanıcı adı başarıyla ayarlandı.**`)).then(msj => msj.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "isim",
  alias: ["i", "nick"]
};