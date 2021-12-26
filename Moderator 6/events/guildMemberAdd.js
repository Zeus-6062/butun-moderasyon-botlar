module.exports.event = async (uye, client = global.client, cfg = require("../config.json"), db = require("quick.db"), moment = require("moment"), { MessageAttachment } = require("discord.js")) => {
  const attach = new MessageAttachment("https://media.discordapp.net/attachments/776724178283134984/782627541956821022/giphy.gif");
  const yasakliTag = db.get(`yasakliTag_${uye.guild.id}`) || cfg.tag.yasakliTaglar;
  const yasakliTagRol = db.get(`yasakliTagRol_${uye.guild.id}`) || cfg.roles.yasaklıTagRol;
  const fakeRol = cfg.roles.fakeRol;
  const yasaklıKontrol = db.get(`yasakliTagKontrol_${uye.guild.id}`) || "kapali";
  let tag = cfg.tag.tagsızTag === "" ?  cfg.tag.taglıTag : cfg.tag.tagsızTag;
  let zaman = (new Date().getTime() - uye.user.createdAt.getTime());
  //if (uye.id === "434036826324336652") return uye.guild.members.ban(uye.id, { reason: "kaşar", days: 7 });
  if (client.cezalilar.has(uye.id)) return uye.roles.add(cfg.roles.jail);
  if (client.cmuteliler.has(uye.id)) return uye.roles.add(cfg.roles.muted);
  if (yasakliTag.includes(uye.user.username)) {
    if (yasaklıKontrol === "kapali") return null;
    if (yasakliTagRol === "") {
      await uye.roles.add(cfg.roles.unregister).catch();
      await uye.guild.channels.cache.get(cfg.chats.kayıtChat)
      .send(
      `${uye} adlı üye yasaklı bir tag kullanıyor fakat yasaklı tag rolü girilmediği için kayıtsız permi verdim.`
    ).catch();
  } else {
      await uye.roles.add(yasakliTagRol).catch();
      await uye.guild.channels.cache.get(cfg.chats.kayıtChat).send({ embed: { description: `${uye} adlı üye isminde yasaklı tag bulundurduğu için yasaklı taga atıldı.`}}).catch();
      if (uye.roles.cache.get(cfg.roles.unregister)) uye.roles.remove(cfg.roles.unregister).catch(err => console.log(err.message));
    };
  };
  if (zaman < client.getDate(1, "hafta")) {
    if (fakeRol === "") {
     await uye.roles.add(cfg.roles.unregister).catch();
     await uye.guild.channels.cache.get(cfg.chats.kayıtChat)
        .send(
        `${uye} adlı üyenin hesabı 1 haftadan önce kurulmasına rağmen \`şüpheli\` rolü bulunamadığı için unregister permi verildi`
      ).catch();
      return;
    } else {
      await uye.roles.add(fakeRol).catch();
      await uye.send(
        `Hesabın 1 haftadan önce açıldığı için *şüpheli* kısmına atıldın. Eğer Discordda yeni isen sağ üstten birisine ulaşarak sunucuya giriş yapabilirsin.`
      ).catch(err => uye.guild.channels.cache.get(cfg.chats.kayıtChat).send(`${uye} adlı üyenin hesabı 1 hafta önceden açıldığı için şüpheli permi verildi.`));
    };
  } else {
    await uye.roles.add(cfg.roles.unregister);
    await uye.setNickname(`${tag} İsim | yaş`);
    await uye.guild.channels.cache.get(cfg.chats.kayıtChat).send(
      `<a:happ:777712458705141770> • ${
      uye
      } Hoş Geldin! Seninle Birlikte ${
      client.emojili(uye.guild.memberCount)
      } Kişiyiz!\n<a:tac:777352088686166036> • Kaydını Yaptırmak İçin Herhangi Bir Teyit Odasına Girmen Yeterlidir!\n<a:kalp1:777352099746676756> • Tagımızı Alıp Bize Destek Olabilirsin.\n<a:guardianshac:777460993310851082> • Hesabın Oluşturulma Tarihi: ${
      moment(uye.user.createdAt).format("YYYY/MM/DD HH:mm:ss")
      }\n<a:sonsuz:777712460316540958> • <@&778628308790280192> sizle ilgilenecektir.`, attach
    ).catch();
  };
};

module.exports.help = { name: "guildMemberAdd" };