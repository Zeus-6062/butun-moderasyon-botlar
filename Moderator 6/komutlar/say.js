module.exports.operate = async ({msg, author, args, client, cfg, db}) => {
  let sayi = 0;
  const sayTürü = db.get(`sayTuru_${msg.guild.id}`) || "emojisiz";
  const uyeSayisi = msg.guild.memberCount;
  const tagliUye = msg.guild.members.cache.filter(u => u.user.username.includes(cfg.tag.taglıTag)).size || 0;
  const onlineUye = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;
  const boosterUye = msg.guild.members.cache.filter(u => u.roles.cache.get(cfg.roles.booster)).size || 0;
  const type = args[0];
  msg.guild.channels.cache.filter(c => c.type === "voice").map(k => { 
    sayi += k.members.size
  });
  if (!type) {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
    if (sayTürü === "emojisiz") {
      msg.channel.send({
        embed: {
          description: `• Sunucumuzda **Toplam** \`${
          uyeSayisi
        }\` Kullanıcı bulunmaktadır.\n• Şuan **Online** \`${
          onlineUye
        }\` Kullanıcı Bulunmaktadır.\n• **Tagımızda** \`${
          tagliUye
        }\` Kullanıcı bulunmaktadır.\n• Sunucumuzda \`${
          boosterUye
        }\` tane **booster** bulunmaktadır.\n• **Ses Kanallarında** \`${
          sayi
        }\` Kullanıcı bulunmaktadır.`,
          author: {
            icon_url: msg.guild.iconURL({dynamic:true}),
            name: msg.guild.name
          },
          color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
          timestamp: new Date(),
          footer: {
            text: `${[client.xd[Math.floor(Math.random() * client.xd.length)]]}`
          }
        }
      }).then(m => m.delete({ timeout: 6000 }));
    } else if (sayTürü === "emojili") {
      msg.channel.send(
        `**${cfg.snc.sncIsim}: ${client.emojili(uyeSayisi)}               Online: ${client.emojili(onlineUye)}**\n\n            **${cfg.snc.tagRolIsim}: ${client.emojili(tagliUye)}**`
      ).then(m => m.delete({ timeout: 6000 }));;
    } else if (sayTürü === "emojiliEmbed") {
        msg.channel.send({
          embed: {
            author: { 
              icon_url: msg.guild.iconURL({dynamic: true}), name: msg.guild.name 
            },
            footer: {
              text: `${[client.xd[Math.floor(Math.random() * client.xd.length)]]}`
            },
            timestamp: new Date(),
            color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
            description: `:white_small_square: **${cfg.snc.sncIsim} Ailesinin Toplam ${
              client.emojili(uyeSayisi)
            } Üyesi Bulunmakta.\n:white_small_square: Aktif ${
              client.emojili(onlineUye)
            } Kullanıcı Bulunmakta.\n:white_small_square: Tagımızı Alarak Ailemize Katılmış ${
              client.emojili(tagliUye)
            } Kişi Bulunmakta.\n:white_small_square: Sunucumuzda ${
              client.emojili(boosterUye)
            } Destekçi Bulunmakta.\n:white_small_square: Ses Kanallarında Toplam ${
              client.emojili(sayi)
            } Kişi Bulunmakta.**`
          }
        }).then(m => m.delete({ timeout: 6000 }));
      };
    } else if (type === "ayarla") {
      let ayar = args[1];
      if (!ayar) return;
      if (!author.permissions.has("MANAGE_ROLES")) return;
      if (ayar === "emojili") {
        if (sayTürü === "emojili") return msg.channel.send("**Say türü zaten emojili.**").then(m => m.delete({ timeout: 5000 }));
        await db.set(`sayTuru_${msg.guild.id}`, "emojili");
        await msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}), name: msg.guild.name},description:`**Say türü emojili olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
      } else if (ayar === "emojisiz") {
        await db.set(`sayTuru_${msg.guild.id}`, "emojisiz");
        await msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}), name: msg.guild.name},description:`**Say türü emojisiz olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
      } else if (ayar === "emojili-embed") {
        await db.set(`sayTuru_${msg.guild.id}`, "emojiliEmbed");
        await msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}), name: msg.guild.name},description:`**Say türü emojili embed olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
      } else return msg.channel.send("**Say türü ayarlarken sadece**\n\n`emojili`, `emojisiz` veya `emojili-embed` olarak ayarlanabilir.").then(m => m.delete({timeout:5000}));
   };
};

module.exports.help = {
  name: "say",
  alias: []
};