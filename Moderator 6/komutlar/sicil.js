module.exports.operate = async ({client, msg, args, db}) => {
  const ayar = args[1];
  if (!ayar) {
    const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]) || msg.guild.member(msg.author);
    let sicil = db.get(`sicil_${kisi.id}`) || [];
    let liste = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.tip.toUpperCase()}]** ${client.toDate(value.zaman)} tarihinde **${value.sebep}** sebebi ile ${msg.guild.members.cache.has(value.yetkili) ? msg.guild.members.cache.get(value.yetkili) : value.yetkili} tarafından atıldı.`).join("\n") : "**Temiz!**";
    msg.channel.send({embed:{author:{name: msg.guild.name,icon_url:msg.guild.iconURL({dynamic:true})},description:`**${kisi} (\`${kisi.id}\`) adlı üyenin sicil bilgisi.**\n\n${liste}`, color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],timestamp:new Date()}});
  } else if (ayar === "temizle") {
    const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[1]) || msg.guild.member(msg.author);
    let sicil = db.get(`sicil_${kisi.id}`) || [];
    if (sicil.length > 0) {
      await db.delete(`sicil_${kisi.id}`);
      await msg.channel.send({embed:{timestamp:new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],description:`**${kisi} adlı üyenin sicili temizlendi.**`}}).then(msj => msj.delete({timeout: 5000}));
    } else {
      await msg.channel.send({embed:{timestamp:new Date(),color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],description:`**${kisi} adlı üyenin sicili zaten temiz.**`}}).then(msj => msj.delete({timeout: 5000}));
    };
  };
};



module.exports.help = {
  name: "sicil",
  alias: []
};