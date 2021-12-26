module.exports.operate = async ({client, msg, author, args, db, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  const type = args[0].toLowerCase();
  const evet = "✅";
  const hayir = "❌";
  if (type === "rol-ekle") {
    const rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
    function onlarFilterBenBeko(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
    if (!rol) return msg.channel.send("**Bir rol etiketlemeli veya idsini girmelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (db.get(`yasakliTagRol_${msg.guild.id}`)) {
      msg.channel.send({embed: { description: `Yasaklı tag komutu için zaten bir role sahipsin. Onaylıyorsan kayıtlı rol yerine ${rol} rolünü yasaklı taga koyacağım.`,timestamp: new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async (m) => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(onlarFilterBenBeko, { max: 1 }).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await db.set(`yasakliTagRol_${msg.guild.id}`, rol.id);
            await m.delete();
            await msg.channel.send({embed: {description: `Başarıyla yeni yasaklı tag rolünü ${rol} olarak ayarladım.`,timestamp: new Date(),color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(msj => msj.delete({ timeout: 5000 }));
          } else {
             await m.delete();
             await msg.channel.send("**Komut iptal edildi.**").then(m => m.delete({ timeout: 5000 }));
          };
        });
      });
    } else {
      await db.set(`yasakliTagRol_${msg.guild.id}`, rol.id);
      msg.channel.send({embed: { description: `Başarıyla yeni yasaklı tag rolünü ${rol} olarak ayarladım.`,timestamp: new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}});
    };
  } else if (type === "rol-sil") {
    if (db.get(`yasakliTagRol_${msg.guild.id}`)) {
      await db.delete(`yasakliTagRol_${msg.guild.id}`);
      await msg.channel.send("**Başarıyla yasaklı tag rolü silindi.**").then(m => m.delete({ timeout: 5000 }));
    } else {
      await msg.channel.send("**Silinecek bir rol yok.**").then(m => m.delete({ timeout: 5000 }));
    };
  } else if (type === "tag-ekle") {
    let taglar = args.slice(1).join("").split("");
    if (db.get(`yasakliTag_${msg.guild.id}`)) {
      var arr = [];
      await taglar.forEach(async x => {
        if (await db.get(`yasakliTag_${msg.guild.id}`).includes(x)) return msg.channel.send(x + " tagı zaten yasaklıda.");
        await db.push(`yasakliTag_${msg.guild.id}`, x);
        arr.push(x);
      });
      msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${arr.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${db.get(`yasakliTag_${msg.guild.id}`).join(", ")}\`)`));
    } else {
      var arr = [];
      await taglar.forEach(x => arr.push(x));
      await db.set(`yasakliTag_${msg.guild.id}`, arr);
      msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${arr.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**`));
    };
  } else if (type === "tag-sil") {
    if (!db.get(`yasakliTag_${msg.guild.id}`)) return msg.channel.send("**Silinecek bir yasaklı tag bulunmamakta !**").then(m => m.delete({ timeout: 5000 }));
    let arr = db.get(`yasakliTag_${msg.guild.id}`);
    let taglar = args[1];
    db.set(`yasakliTag_${msg.guild.id}`, arr.filter(a => a !== taglar));
    msg.channel.send(client.nrmlembed(`**Başarıyla** \`\`[${taglar}]\`\` **tagı yasaklı tagdan çıkarıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${db.get(`yasakliTag_${msg.guild.id}`).join(", ") || "Yasaklı Tag Yok !"}\`)`));
  } else if (type === "tüm-tagları-sil") {
    if (!db.get(`yasakliTag_${msg.guild.id}`)) return msg.channel.send("**Silinecek bir yasaklı tag bulunmamakta !**").then(m => m.delete({ timeout: 5000 }));
    await db.delete(`yasakliTag_${msg.guild.id}`);
    await msg.channel.send("**Tüm yasaklı taglar silindi.**").then(m => m.delete({ timeout: 5000 }));
  } else if (type === "görüntüle") {
    let kontrol = db.get(`yasakliTagKontrol_${msg.guild.id}`) || "kapali";
    let taglar = db.get(`yasakliTag_${msg.guild.id}`) || [];
    let rol = db.get(`yasakliTagRol_${msg.guild.id}`) || "";
    await msg.channel.send({embed: {author: { icon_url: msg.guild.iconURL({dynamic:true}), name: msg.guild.name },description: `**Sunucudaki Yasaklı Taglar:** \`${taglar.join(", ") || "Yasaklı Tag Yok !"}\` \n**Yasaklı Tag Rolü:** \`${rol || "Yasakli Tag Rolü Yok !"}\`\n**Yasaklı Tag Sistemi: **\`${kontrol === "acik" ? "Açık" : "Kapalı"}\` `,timestamp: new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}});
  } else if (type === "tüm-sistemi-sil") {
    await db.delete(`yasakliTag_${msg.guild.id}`);
    await db.delete(`yasakliTagRol_${msg.guild.id}`);
    await db.set(`yasakliTagKontrol_${msg.guild.id}`, "kapali");
    await msg.channel.send({embed:{description:`**Yasaklı Tag Sistemi Tamamiyle Silinmiştir.**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp: new Date()}});
  } else if (type === "kontrol") {
    let kontrol = db.get(`yasakliTagKontrol_${msg.guild.id}`) || "kapali";
    let type2 = args[1].toLowerCase();
    if (["aç", "ac"].includes(type2)) {
      function BekoAslındaFilter(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
      if (kontrol === "acik") return msg.channel.send("**Yasaklı tag sistemi zaten açık.**").then(m => m.delete({ timeout: 5000 }));
      msg.channel.send({embed:{description:`**Yasaklı tag sistemini açmak istediğine emin misin?**\n\n\`Bu sistem açıldığıktan yasaklı taga düşecek taglar: ${db.get(`yasakliTag_${msg.guild.id}`).join(", ") || "Yasaklı Tag Yok !"}\``, timestamp: new Date(), color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(async m => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(BekoAslındaFilter, { max: 1 }).then(async collected => {
          let cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await m.delete();
            await db.set(`yasakliTagKontrol_${msg.guild.id}`, "acik");
            await msg.channel.send({embed:{description:`**Yasaklı tag sistemi başarıyla açıldı.**`, color:Math.floor(Math.random() * (0xFFFFFF+ 1)), timestamp:new Date()}}).then(message => message.delete({ timeout: 5000 }));
          } else {
            await m.delete().catch();
            await msg.channel.send({embed:{description:`**Komut başarıyla iptal edildi.**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(message => message.delete({timeout:5000}));
          };
        });
      });
    } else if (["kapa", "kapat"].includes(type2)) {
      function BekoAslındaFilter(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === msg.author.id };
      if (kontrol === "kapali") return msg.channel.send("**Yasaklı tag sistemi zaten kapalı.**").then(m => m.delete({ timeout: 5000 }));
      await msg.channel.send({embed:{description:`**Yasaklı tag sistemini kapatmak istediğine emin misin?**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp:new Date()}}).then(async m => {
        await m.react(evet);
        await m.react(hayir);
        m.awaitReactions(BekoAslındaFilter, { max: 1 }).then(async collected => {
          var cvp = collected.first();
          if (cvp.emoji.name === evet) {
            await m.delete();
            await db.set(`yasakliTagKontrol_${msg.guild.id}`, "kapali");
            await msg.channel.send({embed:{description:`**Yasaklı tag sistemi başarıyla kapatıldı.**`, color:Math.floor(Math.random() * (0xFFFFFF+ 1)), timestamp:new Date()}}).then(msj => msj.delete({ timeout: 5000 }));
          } else {
            await m.delete().catch();
            await msg.channel.send({embed:{description:`**Komut başarıyla iptal edildi.**`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)]}}).then(msj => msj.delete({timeout:5000}));
          };
        });
      });
    };
  } else if (type === "yardım") {
    await msg.channel.send(
      client.nrmlembed(
        `__**Yasaklı Tag Komutları:**__\n\n \`• yasaklıtag tag-ekle\n• yasaklıtag tag-sil\n• yasaklıtag tüm-tagları-sil\n• yasaklıtag rol-ekle\n• yasaklıtag rol-sil\n• yasaklıtag görüntüle\n• yasaklıtag tüm-sistemi-sil\n• yasaklıtag kontrol aç-kapa\``
      )
    );
  };
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};