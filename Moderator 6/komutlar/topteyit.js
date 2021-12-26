module.exports.operate = async ({client, msg, args, cfg, db}) => {
  let data = db.get("teyit") || {};
  var arr = Object.keys(data);
  var sayi = args[0] || 10;
  let list = arr.filter(dat => msg.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kiz || 0)) - Number((data[a].erkek || 0) + (data[a].kiz || 0))).map((value, index) => `\`${index + 1}.\` ${msg.guild.members.cache.get(value)} | \`${client.sayilariCevir((data[value].erkek || 0) + (data[value].kiz || 0))} teyit\``).splice(0, sayi);
  
  msg.channel.send({
    embed: {
      author: { name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic:true}) },
      description: `**En çok teyit yapan \`${sayi}\` kişi:**\n\n${list.join("\n") || "Yok !"}`,
      color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
      timestamp: new Date()
    }
  }).catch();
};

module.exports.help = {
  name: "topteyit",
  alias: ["tt"]
};