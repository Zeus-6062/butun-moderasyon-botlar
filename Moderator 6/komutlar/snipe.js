module.exports.operate = async ({client, msg, author, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  let data = db.get(`snipe_${msg.guild.id}`) || { author: "Yok", content: "Yok", kanal: "Yok" };
  let a = data.author;
  let content = data.content;
  let channel = data.kanal;
  msg.channel.send({embed:{color:client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],timestamp:new Date(),description:`**Silinen Son Mesaj:**\n\n\`Mesajı Atan Kişi:\` <@${a}> - **(${a})**\n\`Silindiği Kanal:\` <#${channel}> - **(${channel})**\n\`Mesajın İçeriği:\` **${content}**`}})
};

module.exports.help = {
  name: "snipe",
  alias: []
};