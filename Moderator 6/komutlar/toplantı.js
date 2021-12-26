module.exports.operate = async ({client, msg, args, author, cfg}) => {
  const evet = "✅";
  const hayir = "❌";
  if (!cfg.sahipler.includes(author.id)) return;
  if (!author.voice.channel) return msg.channel.send("**Bu komutu kullanmak için bir kanalda olman gerek.**").then(msj => msj.delete({ timeout: 5000 }));
  let tip = args[0];
  var yetkililer = msg.guild.members.cache.filter(y => y.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)));
  if (tip === "çek") {
    var kanal = author.voice.channel.id;
    var ytler = yetkililer.filter(yetkili => yetkili.voice.channel && msg.guild.members.cache.get(yetkili.id).voice.channel.id !== author.voice.channel.id);
    if (ytler.size === 0) return msg.channel.send("**Seste çekilecek yetkili bulunmuyor.**").then(msj => msj.delete({ timeout: 5000 }));
    await msg.channel.send(`\`${ytler.size}\` üye kanala çekiliyor.`);
    ytler.map(user => user.voice.setChannel(kanal));
  } else if (tip === "katıldı") {
    let tip2 = args[1];
    if (["dağıt", "ver"].includes(tip2)) {
      function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
      var katildi = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
      if (!katildi) return msg.channel.send("**Komut kullanımı:**`.toplantı katıldı (dağıt\ver) (<@rol>\rolid)`").then(msj => msj.delete({ timeout: 5000 }));
      var ytler = yetkililer.filter(yetkili => yetkili.voice.channel && msg.guild.members.cache.get(yetkili.id).voice.channel.id === author.voice.channel.id && !yetkili.roles.cache.get(katildi.id));
      if (ytler.size === 0) return msg.channel.send("**Seste yetki verilecek yetkili bulunmuyor.**").then(msj => msj.delete({ timeout: 5000 }));
      msg.channel.send({embed:{description:` \`${author.voice.channel.name}\` adlı kanaldaki herkese katıldı permini vermek istiyor musun?`, color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).then(async msj => {
        await msj.react(evet);
        await msj.react(hayir);
        msj.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await msj.delete();
            await msg.delete();
            await msg.channel.send(`**Başarıyla \`${ytler.size}\` kişiye katıldı permi dağıtıyorum.**`).catch(err => msg.channel.send(err.message));
            ytler.map(y => y.roles.add(katildi.id));
          } else {
            await msj.delete().catch();
            await msg.delete().catch();
            msg.channel.send(`**Komut başarıyla iptal edildi.**`).then(msj => msj.delete({ timeout: 5000 }));
          };
        }).catch(err => [msj.delete(), msg.delete()]);;
      });
    } else if (["al", "topla"].includes(tip2)) {
      function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
      var katildi = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
      if (!katildi) return msg.channel.send("**Komut kullanımı:**`.toplantı katıldı (al\topla) (<@rol>\rolid)`").then(msj => msj.delete({ timeout: 5000 }));
      var ytler = msg.guild.members.cache.filter(u => u.roles.cache.get(katildi.id));
      if (ytler.size === 0) return msg.channel.send("**Katıldı rolüne sahip üye bulunmuyor..**").then(msj => msj.delete({ timeout: 5000 }));
      msg.channel.send({embed:{description:`Katıldı permine sahip tüm üyelerden  katıldı permini almak istiyor musun?`, color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}}).then(async msj => {
        await msj.react(evet);
        await msj.react(hayir);
        msj.awaitReactions(onlarFilterBenBeko, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await msj.delete();
            await msg.delete();
            await msg.channel.send(`**Başarıyla \`${ytler.size}\` kişiden katıldı permini alıyorum.**`).catch(err => msg.channel.send(err.message));
            ytler.map(y => y.roles.remove(katildi.id));
          } else {
            await msj.delete().catch();
            await msg.delete().catch();
            msg.channel.send(`**Komut başarıyla iptal edildi.**`).then(msj => msj.delete({ timeout: 5000 }));
          };
        }).catch(err => [msj.delete(), msg.delete()]);;
      });
    };
  } else return msg.channel.send("**Komut kullanımı yanlış.**").then(msj => msj.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "toplantı",
  alias: ["toplanti"]
};