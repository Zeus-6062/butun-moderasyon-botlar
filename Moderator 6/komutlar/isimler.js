module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`) || ["Kayıtlı isim yok !"];
  var arr = [];
  for (var i = 0; i < isimler.length; i++) {
    arr.push(`\`${i + 1}.\` ${isimler[i]}`);
  };
  msg.channel.send({embed:{author:{name: msg.guild.name, icon_url:msg.guild.iconURL({dynamic:true})},description:arr.join("\n"), color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp:new Date()}});
};

module.exports.help = {
  name: "isimler",
  alias: ["kayıtlar"]
};