module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  var kullanici = author || uye;
  
  const erkek = db.get(`teyit.${kullanici.id}.erkek`) || 0;
  const kız = db.get(`teyit.${kullanici.id}.kiz`) || 0;
  const jail = db.get(`jailAtma_${kullanici.id}`) || 0;
  const mute = db.get(`muteAtma_${kullanici.id}`) || 0;
  const ban = db.get(`banAtma_${kullanici.id}`) || 0;
  let toplam = erkek + kız;
  msg.channel.send({
    embed: { 
      author: {
        name: msg.guild.name,
        icon_url:msg.guild.iconURL({dynamic:true})
      },
      description: `${kullanici} - (\`${kullanici.id}\`) **adlı üyenin yetkili durumu:**\n\n**Kayıt Edilen Erkek Sayısı: ${client.emojili(erkek)}\nKayıt Edilen Kız Sayısı: ${client.emojili(kız)}\nToplam Kayıt Sayısı: ${client.emojili(toplam)}\nAtılan Ban Sayısı: ${client.emojili(ban)}\n\Atılan Mute Sayısı: ${client.emojili(mute)}\nAtılan Jail Sayısı: ${client.emojili(jail)}**`,
      color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
      timestamp: new Date()
    }
  });
};

module.exports.help = {
  name: "ytbilgi",
  alias: ["ybilgi"]
};